'use client';
import React from 'react';
import { signIn } from 'next-auth/react';
import styles from './LoginForm.module.scss';

export default function SignInWithDiscord() {
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

