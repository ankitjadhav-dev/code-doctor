import { describe, expect, it, vi } from 'vitest';

const findFirst = vi.fn();
const findMany = vi.fn();
vi.mock('@code-doctor/database', () => ({ db: { analysisRun: { findFirst, findMany } } }));

describe('findAnalysisRunForOrganization', () => {
  it('queries the run through the current organization boundary', async () => {
    findFirst.mockResolvedValue(null);
    const { findAnalysisRunForOrganization } = await import('./analysis-run-query.service');

    await findAnalysisRunForOrganization('run_123', 'org_456');

    expect(findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 'run_123', organizationId: 'org_456' },
    }));
  });

  it('lists history only through the current organization boundary', async () => {
    findMany.mockResolvedValue([]);
    const { listAnalysisRunsForOrganization } = await import('./analysis-run-query.service');
    await listAnalysisRunsForOrganization('org_456');
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { organizationId: 'org_456' } }));
  });
});
