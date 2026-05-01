import { type Metadata } from 'next';
import { Container } from '@/components/container';
import { AmbientColor } from '@/components/decorations/ambient-color';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    'blog-page',
    {
      filters: { locale: 'fr' },
      populate: 'seo.metaImage',
    },
    true
  );
  return generateMetadataObject(pageData?.seo);
}

export default async function Blog() {
  return (
    <div className="relative overflow-hidden py-20 md:py-0">
      <AmbientColor />
      <Container className="flex flex-col items-center justify-between pb-20">
        <div className="relative z-20 py-10 md:pt-40">
          <span>Comming soon...</span>
        </div>
      </Container>
    </div>
  );
}
