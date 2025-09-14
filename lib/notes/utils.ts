export function slugify(name: string): string {
  return name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\.md$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function titleCase(text: string): string {
  // Unicode-aware title casing of words separated by hyphens/underscores/spaces.
  // Keeps diacritics intact and only uppercases the first code point of each word.
  const normalized = text.replace(/[-_]+/g, ' ').trim();
  const words = normalized.split(/\s+/);
  const cased = words.map((w) => {
    if (!w) return w;
    const chars = Array.from(w);
    const [first, ...rest] = chars;
    return (first?.toLocaleUpperCase() || '') + rest.join('');
  });
  return cased.join(' ');
}
