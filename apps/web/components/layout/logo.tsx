import { Activity } from 'lucide-react';
import Link from 'next/link';
export function Logo({ href = '/' }: { href?: string }) { return <Link href={href} className="flex items-center gap-2 font-semibold tracking-tight text-slate-950 dark:text-white"><span className="grid size-8 place-items-center rounded-lg bg-cyan-500 text-slate-950"><Activity size={18} strokeWidth={2.5} /></span><span>Code Doctor</span></Link>; }
