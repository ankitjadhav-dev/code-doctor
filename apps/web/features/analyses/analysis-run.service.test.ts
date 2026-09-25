import { beforeEach, describe, expect, it, vi } from 'vitest';

const updateMany = vi.fn(); const eventCreate = vi.fn(); const findFirst = vi.fn();
const transaction = vi.fn(async (callback: (tx: unknown) => unknown) => callback({ analysisRun: { updateMany, findFirst }, analysisEvent: { create: eventCreate } }));
vi.mock('@code-doctor/database', () => ({ db: { $transaction: transaction } }));
vi.mock('@/features/github/github-app.server', () => ({ installationClient: vi.fn() }));

describe('cancelQueuedAnalysis', () => {
  beforeEach(() => { vi.clearAllMocks(); findFirst.mockResolvedValue({ id: 'run_1', status: 'CANCELLED' }); });

  it('cancels an organization-scoped queued run and appends one event', async () => {
    updateMany.mockResolvedValue({ count: 1 });
    const { cancelQueuedAnalysis } = await import('./analysis-run.service');
    await cancelQueuedAnalysis('run_1', 'org_1');
    expect(updateMany).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 'run_1', organizationId: 'org_1', status: 'QUEUED' }, data: expect.objectContaining({ status: 'CANCELLED' }) }));
    expect(eventCreate).toHaveBeenCalledTimes(1);
    expect(eventCreate).toHaveBeenCalledWith({ data: expect.objectContaining({ analysisRunId: 'run_1', type: 'CANCELLED' }) });
  });

  it.each(['foreign organization', 'already cancelled', 'non-queued status'])('rejects %s when no queued row transitions', async () => {
    updateMany.mockResolvedValue({ count: 0 });
    const { cancelQueuedAnalysis } = await import('./analysis-run.service');
    await expect(cancelQueuedAnalysis('run_1', 'org_1')).rejects.toThrow('ANALYSIS_NOT_CANCELLABLE');
    expect(eventCreate).not.toHaveBeenCalled();
  });
});
