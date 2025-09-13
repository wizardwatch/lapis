'use client';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './LoginForm.module.scss';

export default function SignInWithDiscord() {
  const { status } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginFormCard}>
        <div className={styles.loginFormCardBody}>
          <h1 className={styles.loginFormTitle}>Login</h1>
          <div className={styles.loginForm}>
            <button
              className={styles.loginFormButton}
              onClick={() => signIn('discord', { callbackUrl: '/' })}
            >
              Sign in with Discord
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
