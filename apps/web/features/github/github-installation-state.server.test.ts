import { describe, expect, it } from 'vitest';
import { createGitHubInstallationState, verifyGitHubInstallationState } from './github-installation-state.server';

const secret = 'a-strong-auth-secret-that-is-long-enough-for-testing';
const user = { userId: 'user_123', organizationId: 'org_456' };
const now = 1_700_000_000_000;

describe('GitHub installation state', () => {
  it('accepts valid state', () => expect(verifyGitHubInstallationState(createGitHubInstallationState(user, secret, now), user, secret, now)).toBe(true));
  it('rejects tampered state', () => expect(verifyGitHubInstallationState(`${createGitHubInstallationState(user, secret, now)}x`, user, secret, now)).toBe(false));
  it('rejects expired state', () => expect(verifyGitHubInstallationState(createGitHubInstallationState(user, secret, now), user, secret, now + 600_001)).toBe(false));
  it('rejects state for a different user', () => expect(verifyGitHubInstallationState(createGitHubInstallationState(user, secret, now), { ...user, userId: 'user_789' }, secret, now)).toBe(false));
  it('rejects state for a different organization', () => expect(verifyGitHubInstallationState(createGitHubInstallationState(user, secret, now), { ...user, organizationId: 'org_789' }, secret, now)).toBe(false));
});
