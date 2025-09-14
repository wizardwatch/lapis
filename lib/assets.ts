// Helpers for building asset paths that map notes/categories to icons.
// Convention (flat files, AVIF only):
// - Note icons: /assets/<category>/<slug>.avif
// - Category icons: /assets/categories/<category>.avif

export function noteIconPath(category: string, slug: string): string {
  return `/assets/${category}/${slug}.avif`;
}

export function categoryIconPath(category: string): string {
  return `/assets/categories/${category}.avif`;
}
