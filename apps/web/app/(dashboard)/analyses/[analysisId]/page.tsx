import { notFound } from 'next/navigation';
import { CheckCircle2, Clock3, GitBranch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ReportPreview } from '@/components/reports/report-preview';
import { findAnalysisRunForOrganization } from '@/features/analyses/analysis-run-query.service';
import { requireWorkspace } from '@/server/authorization';

function timestamp(value: Date) { return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(value); }

export default async function AnalysisReportPage({ params }: { params: Promise<{ analysisId: string }> }) {
  const { analysisId } = await params;
  if (analysisId === 'demo-report') return <div><div className="mb-7"><p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Illustrative report · main</p><h1 className="mt-1 text-3xl font-semibold tracking-tight">northstar-web</h1><p className="mt-2 text-sm text-slate-600 dark:text-slate-400">A static preview of the report experience. No repository has been connected or analyzed.</p></div><ReportPreview /></div>;

  const { organization } = await requireWorkspace();
  const run = await findAnalysisRunForOrganization(analysisId, organization.id);
  if (!run) notFound();

  return <div className="mx-auto max-w-4xl"><div className="mb-7"><Badge className="border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300">{run.status}</Badge><h1 className="mt-3 text-3xl font-semibold tracking-tight">{run.repository.fullName}</h1><p className="mt-2 text-sm text-slate-600 dark:text-slate-400">This request is queued. No repository source has been downloaded, executed, or analyzed.</p></div><div className="grid gap-5 md:grid-cols-2"><Card><CardHeader><h2 className="font-semibold">Queued analysis</h2></CardHeader><CardContent className="space-y-4 text-sm"><div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-300"><Clock3 size={17} /><span className="font-medium">Queued for deterministic analysis</span></div><dl className="space-y-3"><div><dt className="text-slate-500">Branch</dt><dd className="mt-1 flex items-center gap-2 font-mono"><GitBranch size={15} />{run.branch}</dd></div><div><dt className="text-slate-500">Pinned commit SHA</dt><dd className="mt-1 break-all font-mono text-xs">{run.commitSha}</dd></div><div><dt className="text-slate-500">Queued at</dt><dd className="mt-1">{run.queuedAt ? timestamp(run.queuedAt) : 'Not recorded'}</dd></div></dl></CardContent></Card><Card><CardHeader><h2 className="font-semibold">Lifecycle</h2><p className="mt-1 text-sm text-slate-500">Server-recorded events for this request.</p></CardHeader><CardContent><ol className="space-y-4">{run.events.map((event) => <li key={event.id} className="flex gap-3"><CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={17} /><div><p className="text-sm font-medium">{event.type.replaceAll('_', ' ')}</p><p className="text-sm text-slate-600 dark:text-slate-400">{event.message}</p><p className="mt-1 text-xs text-slate-500">{timestamp(event.createdAt)}</p></div></li>)}</ol></CardContent></Card></div></div>;
}
