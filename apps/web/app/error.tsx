'use client';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) { useEffect(() => { console.error(error); }, [error]); return <main className="grid min-h-screen place-items-center bg-slate-50 p-5 dark:bg-slate-950"><div className="max-w-md text-center"><p className="text-sm font-medium text-cyan-600">Something needs attention</p><h1 className="mt-2 text-3xl font-semibold">We could not load this page.</h1><p className="mt-3 text-sm text-slate-600 dark:text-slate-400">The issue was recorded. Please try again.</p><Button className="mt-6" onClick={reset}>Try again</Button></div></main>; }
