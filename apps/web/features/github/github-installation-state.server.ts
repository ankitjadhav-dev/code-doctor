import { createHmac, timingSafeEqual } from 'node:crypto';

const STATE_TTL_MS = 10 * 60 * 1000;

type StateSubject = { userId: string; organizationId: string };
type StatePayload = { subject: string; expiresAt: number };

function hmac(secret: string, value: string) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

function subject(secret: string, input: StateSubject) {
  return hmac(secret, `github-installation-subject:${input.userId}:${input.organizationId}`);
}

export function createGitHubInstallationState(input: StateSubject, secret: string, now = Date.now()) {
  const payload: StatePayload = { subject: subject(secret, input), expiresAt: now + STATE_TTL_MS };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encodedPayload}.${hmac(secret, `github-installation-state:${encodedPayload}`)}`;
}

export function verifyGitHubInstallationState(state: string | null, input: StateSubject, secret: string, now = Date.now()) {
  if (!state) return false;
  const [encodedPayload, signature, extra] = state.split('.');
  if (!encodedPayload || !signature || extra) return false;
  const expectedSignature = hmac(secret, `github-installation-state:${encodedPayload}`);
  if (signature.length !== expectedSignature.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) return false;
  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as StatePayload;
    if (!Number.isFinite(payload.expiresAt) || payload.expiresAt <= now || typeof payload.subject !== 'string') return false;
    const expectedSubject = subject(secret, input);
    return payload.subject.length === expectedSubject.length && timingSafeEqual(Buffer.from(payload.subject), Buffer.from(expectedSubject));
  } catch { return false; }
}
