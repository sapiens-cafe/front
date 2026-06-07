import { unstable_noStore as noStore } from 'next/cache';

export function strapiImage(url: string): string {
  noStore();
  if (!url) return '';

  // Already absolute (Cloudinary URL from Strapi API, or external)
  if (url.startsWith('http')) return url;

  // Legacy local path — still on Railway storage
  if (url.startsWith('/uploads/')) {
    if (!process.env.NEXT_PUBLIC_API_URL && document?.location.host.endsWith('.strapidemo.com')) {
      return `https://${document.location.host.replace('client-', 'api-')}${url}`;
    }
    return process.env.NEXT_PUBLIC_API_URL + url;
  }

  // Filename only (hardcoded assets): Cloudinary in prod, local Strapi in dev
  const filename = url.replace(/^\//, '');
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloudName) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${filename}`;
  }
  return `${process.env.NEXT_PUBLIC_API_URL}/uploads/${filename}`;
}
