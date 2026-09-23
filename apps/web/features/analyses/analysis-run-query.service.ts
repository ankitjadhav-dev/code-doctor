import { db } from '@code-doctor/database';

/** Reads a run through the organization boundary; route parameters are never authority. */
export function findAnalysisRunForOrganization(analysisId: string, organizationId: string) {
  return db.analysisRun.findFirst({
    where: { id: analysisId, organizationId },
    include: {
      repository: { select: { fullName: true } },
      events: { orderBy: { createdAt: 'asc' } },
    },
  });
}
