'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { useUsername } from './UsernameContext';

export default function AuthRedirect({ children }: { children: ReactNode }) {
  const { username } = useUsername();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!username && pathname !== '/login') {
      router.replace('/login');
    }
  }, [username, pathname, router]);

  if (!username && pathname !== '/login') {
    return null;
  }

  return children;
}
