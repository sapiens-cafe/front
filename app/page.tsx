import { Metadata } from 'next';
import PageContent from '@/lib/shared/PageContent';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    'pages',
    {
      filters: { slug: 'homepage', locale: 'fr' },
      populate: 'seo.metaImage',
    },
    true
  );
  return generateMetadataObject(pageData?.seo);
}

export default async function HomePage() {
  const pageData = await fetchContentType(
    'pages',
    { filters: { slug: 'homepage', locale: 'fr' } },
    true
  );
  return <PageContent pageData={pageData} />;
}
