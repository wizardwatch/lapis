'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface UsernameCtx {
  username: string;
  setUsername: (name: string) => void;
}

const UsernameContext = createContext<UsernameCtx>({ username: '', setUsername: () => {} });

export function UsernameProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('username') || '';
  });
  useEffect(() => {
    if (username) localStorage.setItem('username', username);
    else localStorage.removeItem('username');
  }, [username]);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
}

export const useUsername = () => useContext(UsernameContext);
