import { NextRequest, NextResponse } from 'next/server';
import { listBranches } from '@/features/github/github-repository.service';
import { requireWorkspace } from '@/server/authorization';

export async function GET(request: NextRequest, { params }: { params: Promise<{ repositoryId: string }> }) {
  try {
    const { organization } = await requireWorkspace(); const { repositoryId } = await params;
    const installationId = request.nextUrl.searchParams.get('installationId');
    if (!installationId) return NextResponse.json({ code: 'INVALID_REQUEST', message: 'Installation is required.' }, { status: 400 });
    return NextResponse.json({ branches: await listBranches(organization.id, installationId, repositoryId) });
  } catch { return NextResponse.json({ code: 'BRANCHES_UNAVAILABLE', message: 'Could not load authorized branches.' }, { status: 400 }); }
}
