import { db } from '@code-doctor/database';
import { installationClient } from '@/features/github/github-app.server';

export async function createQueuedAnalysis(input: { organizationId: string; userId: string; installationId: string; repositoryId: string; branch: string }) {
  const repository = await db.repository.findFirst({ where: { id: input.repositoryId, organizationId: input.organizationId, githubInstallationId: input.installationId, isArchived: false } });
  const installation = await db.gitHubInstallation.findFirst({ where: { id: input.installationId, organizationId: input.organizationId, suspendedAt: null } });
  if (!repository || !installation || !repository.ownerLogin) throw new Error('REPOSITORY_NOT_AUTHORIZED');
  const client = await installationClient(installation.installationId);
  const { data: remote } = await client.rest.repos.get({ owner: repository.ownerLogin, repo: repository.name });
  if (String(remote.id) !== repository.externalId || remote.archived || remote.disabled) throw new Error('REPOSITORY_NOT_AUTHORIZED');
  const { data: ref } = await client.rest.repos.getBranch({ owner: repository.ownerLogin, repo: repository.name, branch: input.branch });
  const commitSha = ref.commit.sha;
  if (!/^[a-f0-9]{40}$/i.test(commitSha)) throw new Error('INVALID_COMMIT_SHA');
  return db.analysisRun.create({ data: { organizationId: input.organizationId, repositoryId: repository.id, githubInstallationId: installation.id, requestedByUserId: input.userId, branch: ref.name, commitSha, status: 'QUEUED', statusDetail: 'Queued for deterministic analysis.', queuedAt: new Date(), events: { create: [{ type: 'CREATED', message: 'Analysis request created.' }, { type: 'REPOSITORY_VALIDATED', message: 'Repository authorization verified.' }, { type: 'REF_RESOLVED', message: 'Branch resolved to an immutable commit SHA.' }, { type: 'QUEUED', message: 'Queued for deterministic analysis.' }] } }, include: { events: true } });
}
