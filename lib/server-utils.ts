import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { slugify } from './notes/utils';

export function loadElements(notesDir: string): Record<string, string> {
  const dir = path.join(notesDir, 'elements');
  const map: Record<string, string> = {};
  if (fs.existsSync(dir)) {
    for (const name of fs.readdirSync(dir)) {
      if (name.endsWith('.md')) {
        const file = fs.readFileSync(path.join(dir, name), 'utf8');
        const { content } = matter(file);
        map[slugify(name)] = content.trim();
      }
    }
  }
  return map;
}
