'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function ViewAsSelector() {
  const { data } = useSession();
  const role = (data as any)?.role as string | undefined;
  const router = useRouter();
  const [players, setPlayers] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<string>('');

  React.useEffect(() => {
    if (role !== 'dm') return;
    const current = getCookie('viewAs') || '';
    setValue(current);
    fetch('/api/players')
      .then((r) => r.json())
      .then((j) => setPlayers(j.players || []))
      .catch(() => setPlayers([]));
  }, [role]);

  if (role !== 'dm') return null;

  return (
    <label style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
      <span style={{ opacity: 0.8 }}>View as</span>
      <select
        value={value}
        onChange={(e) => {
          const v = e.currentTarget.value;
          setValue(v);
          const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toUTCString();
          if (v) {
            document.cookie = `viewAs=${encodeURIComponent(v)}; path=/; expires=${expires}`;
          } else {
            document.cookie = `viewAs=; path=/; max-age=0`;
          }
          router.refresh();
        }}
        style={{
          background: 'var(--color-base-100)',
          color: 'var(--color-base-content)',
          border: '1px solid var(--color-base-300)',
          borderRadius: '0.4rem',
          padding: '0.25rem 0.5rem',
        }}
      >
        <option value="">DM (default)</option>
        {players.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </label>
  );
}

