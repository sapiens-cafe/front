import { Metadata } from 'next';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Featured } from '@/components/events/featured';
import { EventItems } from '@/components/events/event-items';
import { Subheading } from '@/components/elements/subheading';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    'event-page',
    { filters: { locale: 'fr' }, populate: 'seo.metaImage' },
    true
  );
  return generateMetadataObject(pageData?.seo);
}

export default async function Events() {
  const eventPage = await fetchContentType('event-page', { filters: { locale: 'fr' } }, true);
  const events = await fetchContentType('events');
  const featured = events?.data?.filter((event: { featured: boolean }) => event.featured) ?? [];

  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <Container className="pt-40 pb-40">
        <Heading as="h1" className="pt-4">
          {eventPage?.heading}
        </Heading>
        <Subheading className="max-w-3xl mx-auto">{eventPage?.sub_heading}</Subheading>
        {featured.length > 0 && <Featured events={featured} />}
        <EventItems events={events?.data ?? []} />
      </Container>
    </div>
  );
}
