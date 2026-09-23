import { NextResponse } from 'next/server';
import { db } from '@code-doctor/database';
import { requireWorkspace } from '@/server/authorization';

export async function GET() {
  try {
    const { organization } = await requireWorkspace();
    const installations = await db.gitHubInstallation.findMany({ where: { organizationId: organization.id, suspendedAt: null }, select: { id: true, accountLogin: true, accountType: true, repositorySelection: true } });
    return NextResponse.json({ installations });
  } catch { return NextResponse.json({ code: 'UNAUTHORIZED', message: 'Sign in is required.' }, { status: 401 }); }
}
