import { db } from '@code-doctor/database';
import { installationClient } from './github-app.server';

export async function listAuthorizedRepositories(organizationId: string, installationId: string) {
  const installation = await db.gitHubInstallation.findFirst({ where: { id: installationId, organizationId, suspendedAt: null } });
  if (!installation) throw new Error('INSTALLATION_NOT_FOUND');
  const client = await installationClient(installation.installationId);
  const { data } = await client.rest.apps.listReposAccessibleToInstallation({ per_page: 100 });
  return data.repositories.filter((repo) => !repo.disabled).map((repo) => ({ id: String(repo.id), name: repo.name, fullName: repo.full_name, defaultBranch: repo.default_branch ?? null, private: repo.private, archived: repo.archived }));
}

export async function listBranches(organizationId: string, installationId: string, repositoryId: string) {
  const repository = await db.repository.findFirst({ where: { id: repositoryId, organizationId, githubInstallationId: installationId } });
  if (!repository || !repository.ownerLogin) throw new Error('REPOSITORY_NOT_FOUND');
  const installation = await db.gitHubInstallation.findFirst({ where: { id: installationId, organizationId, suspendedAt: null } });
  if (!installation) throw new Error('INSTALLATION_NOT_FOUND');
  const client = await installationClient(installation.installationId);
  const { data } = await client.rest.repos.listBranches({ owner: repository.ownerLogin, repo: repository.name, per_page: 100 });
  return data.map((branch) => ({ name: branch.name, commitSha: branch.commit.sha }));
}

export async function syncRepository(organizationId: string, installationId: string, externalId: string) {
  const allowed = await listAuthorizedRepositories(organizationId, installationId);
  const repository = allowed.find((item) => item.id === externalId);
  if (!repository || repository.archived) throw new Error('REPOSITORY_NOT_AUTHORIZED');
  const [ownerLogin, name] = repository.fullName.split('/');
  if (!ownerLogin || !name) throw new Error('INVALID_REPOSITORY');
  return db.repository.upsert({ where: { organizationId_provider_externalId: { organizationId, provider: 'GITHUB', externalId } }, create: { organizationId, provider: 'GITHUB', externalId, name, fullName: repository.fullName, ownerLogin, defaultBranch: repository.defaultBranch, isPrivate: repository.private, isArchived: repository.archived, githubInstallationId: installationId, lastSyncedAt: new Date() }, update: { name, fullName: repository.fullName, ownerLogin, defaultBranch: repository.defaultBranch, isPrivate: repository.private, isArchived: repository.archived, githubInstallationId: installationId, lastSyncedAt: new Date() } });
}
