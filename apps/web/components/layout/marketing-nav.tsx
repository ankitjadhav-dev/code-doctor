import Link from 'next/link';
import { Logo } from '@/components/layout/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
export function MarketingNav() { return <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80"><div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"><Logo /><div className="flex items-center gap-2"><ThemeToggle /><Link href="/sign-in"><Button size="sm">Sign in</Button></Link></div></div></header>; }
