import { NextRequest, NextResponse } from 'next/server';
import { listAuthorizedRepositories, syncRepository } from '@/features/github/github-repository.service';
import { requireWorkspace } from '@/server/authorization';

export async function GET(request: NextRequest) {
  try {
    const { organization } = await requireWorkspace();
    const installationId = request.nextUrl.searchParams.get('installationId');
    if (!installationId) return NextResponse.json({ code: 'INVALID_REQUEST', message: 'Installation is required.' }, { status: 400 });
    const remote = await listAuthorizedRepositories(organization.id, installationId);
    const repositories = await Promise.all(remote.filter((repo) => !repo.archived).map((repo) => syncRepository(organization.id, installationId, repo.id)));
    return NextResponse.json({ repositories: repositories.map((repo) => ({ id: repo.id, name: repo.name, fullName: repo.fullName, defaultBranch: repo.defaultBranch, private: repo.isPrivate })) });
  } catch { return NextResponse.json({ code: 'REPOSITORIES_UNAVAILABLE', message: 'Could not load authorized repositories.' }, { status: 400 }); }
}
