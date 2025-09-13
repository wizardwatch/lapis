'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { useUsername } from './UsernameContext';

export default function AuthRedirect({ children }: { children: ReactNode }) {
  const { username } = useUsername();
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    const authed = !!(session.data && (session.data as any).player);
    if (!authed && !username && pathname !== '/login') {
      router.replace('/login');
    }
  }, [session.data, username, pathname, router]);

  const authed = !!(session.data && (session.data as any).player) || !!username;
  if (!authed && pathname !== '/login') return null;

  return children;
}
