import { Activity, Github, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth, signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export default async function SignInPage() {
  const session = await auth();
  if (session?.user) redirect('/dashboard');
  return <main className="grid min-h-screen place-items-center bg-slate-50 p-5 dark:bg-slate-950"><section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"><Link href="/" className="flex items-center gap-2 font-semibold"><span className="grid size-8 place-items-center rounded-lg bg-cyan-500 text-slate-950"><Activity size={18} /></span>Code Doctor</Link><div className="mt-10"><p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Welcome</p><h1 className="mt-2 text-3xl font-semibold tracking-tight">See your codebase clearly.</h1><p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">Sign in to create a private workspace for your engineering health reports.</p></div><form className="mt-8" action={async () => { 'use server'; await signIn('github', { redirectTo: '/dashboard' }); }}><Button className="w-full" size="lg"><Github size={18} />Continue with GitHub</Button></form><div className="mt-7 flex gap-3 border-t border-slate-100 pt-5 text-xs leading-5 text-slate-500 dark:border-slate-800"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-500" size={16} />GitHub is used for identity only in this release. Code Doctor does not access repositories yet.</div></section></main>;
}
