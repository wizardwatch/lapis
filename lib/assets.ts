// Helpers for building asset paths that map notes/categories to icons.
// Convention (flat files):
// - Note icons: /assets/<category>/<slug>.png
// - Category icons: /assets/categories/<category>.png

export function noteIconPath(category: string, slug: string): string {
  return `/assets/${category}/${slug}.png`;
}

export function categoryIconPath(category: string): string {
  return `/assets/categories/${category}.png`;
}

export function noteIconSources(category: string, slug: string): string[] {
  return [
    `/assets/${category}/${slug}.png`,
    `/assets/${category}/${slug}.jpg`,
    `/assets/${category}/${slug}.jpeg`,
  ];
}

export function categoryIconSources(category: string): string[] {
  return [
    `/assets/categories/${category}.png`,
    `/assets/categories/${category}.jpg`,
    `/assets/categories/${category}.jpeg`,
  ];
}
