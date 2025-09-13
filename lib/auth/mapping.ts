import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export type PlayerEntry = {
  name: string;
  role: 'dm' | 'player';
  emails: string[];
};

let cache: { mtimeMs: number; entries: PlayerEntry[] } | null = null;

function load(): PlayerEntry[] {
  const file = path.join(process.cwd(), '..', 'notes', '_auth', 'players.yaml');
  const stat = fs.statSync(file);
  if (cache && cache.mtimeMs === stat.mtimeMs) return cache.entries;
  const doc = yaml.load(fs.readFileSync(file, 'utf8')) as { players?: PlayerEntry[] };
  const entries: PlayerEntry[] = (doc.players || []).map((n: any) => ({
    name: String(n.name || ''),
    role: n.role === 'dm' ? 'dm' : 'player',
    emails: Array.isArray(n.emails) ? n.emails.map((e: any) => String(e).toLowerCase()) : [],
  }));
  cache = { mtimeMs: stat.mtimeMs, entries };
  return entries;
}

export function getPlayerByEmail(email: string): { name: string; role: 'dm'|'player' } | null {
  const e = email.toLowerCase();
  const hit = load().find((p) => p.emails.includes(e));
  return hit ? { name: hit.role === 'dm' ? 'DM' : hit.name, role: hit.role } : null;
}

export function getAllPlayers(): PlayerEntry[] {
  return load();
}

