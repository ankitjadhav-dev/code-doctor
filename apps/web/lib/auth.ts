import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { db } from '@code-doctor/database';
import { env } from '@/lib/env';

function personalWorkspace(name: string | null | undefined, userId: string) {
  const base = (name ?? 'My').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'my';
  return { name: `${name ?? 'My'} workspace`, slug: `${base}-${userId.slice(-8)}` };
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: env.AUTH_GITHUB_ID,
      clientSecret: env.AUTH_GITHUB_SECRET,
      authorization: { params: { scope: 'read:user user:email' } },
    }),
  ],
  pages: { signIn: '/sign-in' },
  events: {
    async createUser({ user }) {
      const workspace = personalWorkspace(user.name, user.id!);
      await db.organization.create({
        data: {
          ...workspace,
          ownerId: user.id!,
          memberships: { create: { userId: user.id!, role: 'OWNER' } },
        },
      });
    },
  },
});
