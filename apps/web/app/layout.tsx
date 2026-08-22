import type { Metadata } from 'next';
import '@/app/globals.css';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = { title: { default: 'Code Doctor', template: '%s | Code Doctor' }, description: 'Evidence-led engineering health reports for modern codebases.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en" suppressHydrationWarning><body className="min-h-screen antialiased"><ThemeProvider>{children}</ThemeProvider></body></html>; }
