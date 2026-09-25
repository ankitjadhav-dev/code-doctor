import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { requireWorkspace } from '@/server/authorization';
import { createGitHubInstallationState } from '@/features/github/github-installation-state.server';
export async function POST() { try { const { user, organization } = await requireWorkspace(); if (!env.GITHUB_APP_ID || !env.GITHUB_APP_PRIVATE_KEY) return NextResponse.json({ code: 'GITHUB_APP_NOT_CONFIGURED', message: 'GitHub App setup is required.' }, { status: 503 }); const url = new URL(`https://github.com/apps/${env.GITHUB_APP_SLUG}/installations/new`); url.searchParams.set('state', createGitHubInstallationState({ userId: user.id, organizationId: organization.id }, env.AUTH_SECRET)); return NextResponse.json({ url: url.toString() }); } catch { return NextResponse.json({ code: 'UNAUTHORIZED', message: 'Sign in is required.' }, { status: 401 }); } }
