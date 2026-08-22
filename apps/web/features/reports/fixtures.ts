import type { FindingCategory, FindingSeverity, Score } from '@code-doctor/contracts';

export const demoScore: Score = { overall: 84, security: 92, codeQuality: 85, maintainability: 79, testing: 76, dependencies: 91, errorHandling: 81, architecture: 87 };
export const categories: Array<{ label: string; value: number; key: keyof Score }> = [
  { label: 'Security', value: 92, key: 'security' }, { label: 'Code quality', value: 85, key: 'codeQuality' }, { label: 'Maintainability', value: 79, key: 'maintainability' }, { label: 'Testing', value: 76, key: 'testing' }, { label: 'Dependencies', value: 91, key: 'dependencies' }, { label: 'Error handling', value: 81, key: 'errorHandling' }, { label: 'Architecture', value: 87, key: 'architecture' },
];
export const demoFindings: Array<{ id: string; title: string; category: FindingCategory; severity: FindingSeverity; file: string; line: number; description: string }> = [
  { id: '1', title: 'Unhandled asynchronous operation', category: 'ERROR_HANDLING', severity: 'HIGH', file: 'src/services/checkout.ts', line: 48, description: 'A rejected request can leave callers without a useful error boundary.' },
  { id: '2', title: 'Dependency is two major versions behind', category: 'DEPENDENCIES', severity: 'MEDIUM', file: 'package.json', line: 23, description: 'Upgrade planning would reduce compatibility and security risk.' },
  { id: '3', title: 'Large module has mixed responsibilities', category: 'MAINTAINABILITY', severity: 'MEDIUM', file: 'src/app/billing/page.tsx', line: 1, description: 'Separate payment, presentation, and state concerns to improve change safety.' },
];
export const recentAnalyses = [
  { name: 'northstar-web', branch: 'main', score: 84, status: 'Complete', updated: '2 hours ago' },
  { name: 'api-gateway', branch: 'main', score: 78, status: 'Complete', updated: 'Yesterday' },
  { name: 'design-system', branch: 'next', score: 91, status: 'Complete', updated: '3 days ago' },
];
