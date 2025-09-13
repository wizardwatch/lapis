import type { NextAuthConfig } from 'next-auth';
import Discord from 'next-auth/providers/discord';
import { getPlayerByEmail } from '@/lib/auth/mapping';

const authConfig = {
  providers: [
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  trustHost: true,
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user }) {
      const email = user.email?.toLowerCase() || '';
      return !!getPlayerByEmail(email);
    },
    async session({ session }) {
      const email = session.user?.email?.toLowerCase() || '';
      const entry = email ? getPlayerByEmail(email) : null;
      // @ts-expect-error augment at use site
      session.player = entry ? (entry.role === 'dm' ? 'DM' : entry.name) : '';
      // @ts-expect-error augment at use site
      session.role = entry?.role || undefined;
      return session;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;

