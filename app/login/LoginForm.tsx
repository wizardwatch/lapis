'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import React from 'react';
import { useUsername } from '../../components/UsernameContext';
import * as Ariakit from '@ariakit/react';
import styles from './LoginForm.module.scss';

export default function LoginForm({ usernames }: { usernames: string[] }) {
  const router = useRouter();
  const { setUsername } = useUsername();
  const [name, setName] = useState('');

  const form = Ariakit.useFormStore({
    defaultValues: { username: '' },
  });

  // Update the form store when the local state changes (e.g., if usernames change)
  useEffect(() => {
    form.setValue("username", name);
  }, [name, form]);

  return (
    <div className={styles.loginFormContainer}>
      <div className={styles.loginFormCard}>
        <div className={styles.loginFormCardBody}>
          <h1 className={styles.loginFormTitle}>Login</h1>
          <Ariakit.Form
            store={form}
            onSubmit={(e: React.FormEvent) => {
              e.preventDefault();
              setUsername(name);
              document.cookie = `username=${encodeURIComponent(name)}; path=/`;
              router.push('/');
            }}
            className={styles.loginForm}
          >
            <Ariakit.SelectProvider
              value={name}
              setValue={setName}
            >
              <Ariakit.Select
                name="username"
                className={styles.loginFormSelect}
              />
              <Ariakit.SelectPopover className={styles.loginFormSelectPopover}>
                {usernames.map((u) => (
                  <Ariakit.SelectItem key={u} value={u} className={styles.loginFormSelectItem}>
                    {u}
                  </Ariakit.SelectItem>
                ))}
              </Ariakit.SelectPopover>
            </Ariakit.SelectProvider>
            <Ariakit.FormSubmit className={styles.loginFormButton}>
              Login
            </Ariakit.FormSubmit>
          </Ariakit.Form>
        </div>
      </div>
    </div>
  );
}
