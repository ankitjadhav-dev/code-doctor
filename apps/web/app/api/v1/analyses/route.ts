import { NextRequest, NextResponse } from 'next/server';
import { createAnalysisSchema } from '@code-doctor/contracts';
import { createQueuedAnalysis } from '@/features/analyses/analysis-run.service';
import { requireWorkspace } from '@/server/authorization';
export async function POST(request: NextRequest) { try { const workspace = await requireWorkspace(); const parsed = createAnalysisSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ code: 'INVALID_REQUEST', message: 'Invalid analysis request.' }, { status: 400 }); const run = await createQueuedAnalysis({ ...parsed.data, organizationId: workspace.organization.id, userId: workspace.user.id }); return NextResponse.json({ id: run.id, status: run.status, branch: run.branch, commitSha: run.commitSha }, { status: 201 }); } catch { return NextResponse.json({ code: 'ANALYSIS_REQUEST_FAILED', message: 'Unable to queue analysis.' }, { status: 400 }); } }
