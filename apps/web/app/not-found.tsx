import Link from 'next/link';
import { Button } from '@/components/ui/button';
export default function NotFound() { return <main className="grid min-h-screen place-items-center bg-slate-50 p-5 text-center dark:bg-slate-950"><div><p className="text-sm font-medium text-cyan-600">404</p><h1 className="mt-2 text-3xl font-semibold">This report is not available.</h1><p className="mt-3 text-sm text-slate-600 dark:text-slate-400">It may have been removed, or the link is not valid.</p><Link href="/dashboard"><Button className="mt-6">Return to dashboard</Button></Link></div></main>; }
