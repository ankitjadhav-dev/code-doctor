import { describe, expect, it, vi } from 'vitest';

const findFirst = vi.fn();
vi.mock('@code-doctor/database', () => ({ db: { analysisRun: { findFirst } } }));

describe('findAnalysisRunForOrganization', () => {
  it('queries the run through the current organization boundary', async () => {
    findFirst.mockResolvedValue(null);
    const { findAnalysisRunForOrganization } = await import('./analysis-run-query.service');

    await findAnalysisRunForOrganization('run_123', 'org_456');

    expect(findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'run_123', organizationId: 'org_456' },
    }));
  });
});
