import { db } from '@code-doctor/database';
import { auth } from '@/lib/auth';

export async function requireWorkspace() {
  const session = await auth();
  if (!session?.user?.email) throw new Error('UNAUTHENTICATED');
  const user = await db.user.findUnique({ where: { email: session.user.email }, include: { memberships: { include: { organization: true }, take: 1 } } });
  const membership = user?.memberships[0];
  if (!user || !membership) throw new Error('FORBIDDEN');
  return { user, organization: membership.organization, role: membership.role };
}
