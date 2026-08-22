import { describe, expect, it } from 'vitest';
import { scoreSchema } from './index';

describe('scoreSchema', () => {
  it('accepts transparent score values', () => {
    expect(scoreSchema.parse({ overall: 87, security: 92, codeQuality: 85, maintainability: 82, testing: 78, dependencies: 91, errorHandling: 84, architecture: 88 }).overall).toBe(87);
  });

  it('rejects a score outside its range', () => {
    expect(() => scoreSchema.parse({ overall: 101, security: 92, codeQuality: 85, maintainability: 82, testing: 78, dependencies: 91, errorHandling: 84, architecture: 88 })).toThrow();
  });
});
