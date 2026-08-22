import { NextResponse } from 'next/server';
import { env } from '@/lib/env';
import { requireWorkspace } from '@/server/authorization';
export async function POST() { try { await requireWorkspace(); if (!env.GITHUB_APP_ID || !env.GITHUB_APP_PRIVATE_KEY) return NextResponse.json({ code: 'GITHUB_APP_NOT_CONFIGURED', message: 'GitHub App setup is required.' }, { status: 503 }); return NextResponse.json({ url: `https://github.com/apps/${env.GITHUB_APP_SLUG}/installations/new` }); } catch { return NextResponse.json({ code: 'UNAUTHORIZED', message: 'Sign in is required.' }, { status: 401 }); } }
