import type { ImageMetadata } from 'astro';

// Every photo in src/assets/photos/, keyed by file name.
// Recipes refer to a photo by file name (photo: palak_paneer.jpg). If the file
// isn't there, getPhoto returns undefined and the page shows a placeholder
// instead of failing the build.
const files = import.meta.glob<{ default: ImageMetadata }>('/src/assets/photos/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', {
  eager: true,
});

const byName = new Map(Object.entries(files).map(([path, mod]) => [path.split('/').pop()!.toLowerCase(), mod.default]));

export function getPhoto(name?: string): ImageMetadata | undefined {
  if (!name) return undefined;
  const photo = byName.get(name.toLowerCase());
  if (!photo) console.warn(`[photos] "${name}" not found in src/assets/photos/ — showing a placeholder.`);
  return photo;
}
