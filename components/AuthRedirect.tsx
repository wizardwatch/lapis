'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useSession } from 'next-auth/react';

export default function AuthRedirect({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { status, data } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/login') {
      router.replace('/login');
    }
  }, [status, pathname, router]);

  if (status === 'loading') return null;
  if (status === 'unauthenticated' && pathname !== '/login') return null;

  return children;
}
