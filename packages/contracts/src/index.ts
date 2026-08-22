import { z } from 'zod';

export const membershipRoleSchema = z.enum(['OWNER', 'MEMBER']);
export type MembershipRole = z.infer<typeof membershipRoleSchema>;

export const analysisStatusSchema = z.enum([
  'DRAFT',
  'QUEUED',
  'RUNNING',
  'COMPLETED',
  'FAILED',
  'CANCELLED',
]);
export type AnalysisStatus = z.infer<typeof analysisStatusSchema>;

export const findingCategorySchema = z.enum([
  'ARCHITECTURE',
  'CODE_QUALITY',
  'SECURITY',
  'PERFORMANCE',
  'MAINTAINABILITY',
  'TESTING',
  'DEPENDENCIES',
  'ERROR_HANDLING',
  'DOCUMENTATION',
]);
export type FindingCategory = z.infer<typeof findingCategorySchema>;

export const findingSeveritySchema = z.enum(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO']);
export type FindingSeverity = z.infer<typeof findingSeveritySchema>;

export const scoreSchema = z.object({
  overall: z.number().int().min(0).max(100),
  security: z.number().int().min(0).max(100),
  codeQuality: z.number().int().min(0).max(100),
  maintainability: z.number().int().min(0).max(100),
  testing: z.number().int().min(0).max(100),
  dependencies: z.number().int().min(0).max(100),
  errorHandling: z.number().int().min(0).max(100),
  architecture: z.number().int().min(0).max(100),
});
export type Score = z.infer<typeof scoreSchema>;

export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});
export type ApiError = z.infer<typeof apiErrorSchema>;

export const createAnalysisSchema = z.object({
  installationId: z.string().cuid(),
  repositoryId: z.string().cuid(),
  branch: z.string().min(1).max(255),
});
export type CreateAnalysisInput = z.infer<typeof createAnalysisSchema>;

export const githubRepositorySchema = z.object({ id: z.string(), name: z.string(), fullName: z.string(), defaultBranch: z.string().nullable(), private: z.boolean(), archived: z.boolean() });
export const githubBranchSchema = z.object({ name: z.string(), commitSha: z.string().regex(/^[0-9a-f]{40}$/i) });

export const paginatedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({ items: z.array(item), nextCursor: z.string().nullable() });
