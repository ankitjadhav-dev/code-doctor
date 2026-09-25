import { NextRequest, NextResponse } from 'next/server';
import { db } from '@code-doctor/database';
import { githubApp } from '@/features/github/github-app.server';
import { requireWorkspace } from '@/server/authorization';
import { env } from '@/lib/env';
import { verifyGitHubInstallationState } from '@/features/github/github-installation-state.server';

export async function GET(request: NextRequest) {
    try {
        const { user, organization } = await requireWorkspace();

        if (!verifyGitHubInstallationState(request.nextUrl.searchParams.get('state'), { userId: user.id, organizationId: organization.id }, env.AUTH_SECRET)) {
            return NextResponse.json({ code: 'INVALID_INSTALLATION_STATE', message: 'Invalid installation request.' }, { status: 400 });
        }

        const raw = request.nextUrl.searchParams.get('installation_id');

        if (!raw || !/^\d+$/.test(raw)) {
            return NextResponse.json(
                {
                    code: 'INVALID_INSTALLATION',
                    message: 'Invalid installation.',
                },
                { status: 400 },
            );
        }

        const installation = await githubApp().octokit.rest.apps.getInstallation({
            installation_id: Number(raw),
        });

        const data = installation.data;

        const accountLogin =
            data.account &&
            'login' in data.account &&
            typeof data.account.login === 'string'
                ? data.account.login
                : 'unknown';

        await db.gitHubInstallation.upsert({
            where: {
                installationId: BigInt(raw),
            },
            create: {
                organizationId: organization.id,
                installationId: BigInt(raw),
                accountLogin,
                accountType:
                    data.target_type === 'Organization' ? 'ORGANIZATION' : 'USER',
                repositorySelection:
                    data.repository_selection === 'all' ? 'ALL' : 'SELECTED',
                permissions: data.permissions,
            },
            update: {
                organizationId: organization.id,
                accountLogin,
                accountType:
                    data.target_type === 'Organization' ? 'ORGANIZATION' : 'USER',
                repositorySelection:
                    data.repository_selection === 'all' ? 'ALL' : 'SELECTED',
                permissions: data.permissions,
                suspendedAt: data.suspended_at
                    ? new Date(data.suspended_at)
                    : null,
            },
        });

        return NextResponse.redirect(
            new URL('/analyses/new?github=connected', request.url),
        );
    } catch {
        return NextResponse.json(
            {
                code: 'INSTALLATION_FAILED',
                message: 'Could not verify GitHub installation.',
            },
            { status: 400 },
        );
    }
}
