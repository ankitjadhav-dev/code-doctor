'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function CancelAnalysisButton({ analysisId }: { analysisId: string }) {
  const router = useRouter(); const [error, setError] = useState(''); const [pending, setPending] = useState(false);
  async function cancel() { setPending(true); setError(''); const response = await fetch(`/api/v1/analyses/${analysisId}`, { method: 'DELETE' }); if (response.ok) router.refresh(); else { const body = await response.json(); setError(body.message ?? 'Unable to cancel analysis.'); setPending(false); } }
  return <div className="mt-5"><Button variant="outline" disabled={pending} onClick={cancel}>{pending ? 'Cancelling…' : 'Cancel analysis'}</Button>{error && <p role="alert" className="mt-2 text-sm text-rose-600">{error}</p>}</div>;
}
