import { Metadata } from 'next';
import PageContent from '@/lib/shared/PageContent';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    'pages',
    {
      filters: { slug: params.slug, locale: 'fr' },
      populate: 'seo.metaImage',
    },
    true
  );
  return generateMetadataObject(pageData?.seo);
}

export default async function Page({ params }: { params: { slug: string } }) {
  const pageData = await fetchContentType(
    'pages',
    { filters: { slug: params.slug, locale: 'fr' } },
    true
  );
  return <PageContent pageData={pageData} />;
}
