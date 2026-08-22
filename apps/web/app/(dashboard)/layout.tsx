import { DashboardNav } from '@/components/layout/dashboard-nav';
export default function DashboardLayout({ children }: { children: React.ReactNode }) { return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 lg:flex"><DashboardNav /><main className="min-w-0 flex-1"><div className="mx-auto max-w-7xl p-5 sm:p-8">{children}</div></main></div>; }
