import { host } from '@/config';
import fetchContentType from '@/lib/strapi/fetchContentType';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [eventsRes, pagesRes] = await Promise.all([
    fetchContentType('events', { fields: ['slug', 'updatedAt'] }),
    fetchContentType('pages', { fields: ['slug', 'updatedAt'], filters: { locale: 'fr' } }),
  ]);

  const eventEntries: MetadataRoute.Sitemap = (eventsRes?.data ?? []).map(
    (event: { slug: string; updatedAt: string }) => ({
      url: `${host}/events/${event.slug}`,
      lastModified: event.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })
  );

  const pageEntries: MetadataRoute.Sitemap = (pagesRes?.data ?? [])
    .filter((page: { slug: string }) => page.slug && page.slug !== 'blog')
    .map((page: { slug: string; updatedAt: string }) => ({
      url: `${host}/${page.slug}`,
      lastModified: page.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }));

  return [
    {
      url: host,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${host}/events`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${host}/food-menu`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...eventEntries,
    ...pageEntries,
  ];
}
