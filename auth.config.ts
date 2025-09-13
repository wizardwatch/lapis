import type { NextAuthConfig } from 'next-auth';
import Discord from 'next-auth/providers/discord';
import { getPlayerByEmail } from '@/lib/auth/mapping';

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  // Provide a clearer error at startup so setup issues are obvious.
  console.error('[auth] Missing DISCORD_CLIENT_ID or DISCORD_CLIENT_SECRET. Set them in lapis/.env.local');
}

const authConfig = {
  providers: [
    Discord({
      clientId: CLIENT_ID as string,
      clientSecret: CLIENT_SECRET as string,
      authorization: {
        params: { scope: 'identify email' },
      },
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
