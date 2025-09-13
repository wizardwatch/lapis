'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useSession } from 'next-auth/react';

export default function AuthRedirect({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    const authed = !!(session.data && (session.data as any).player);
    if (!authed && pathname !== '/login') {
      router.replace('/login');
    }
  }, [session.data, pathname, router]);

  const authed = !!(session.data && (session.data as any).player);
  if (!authed && pathname !== '/login') return null;

  return children;
}
