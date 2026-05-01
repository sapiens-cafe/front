import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Container } from '@/components/container';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { SingleEvent } from '@/components/events/single-event';
import DynamicZoneManager from '@/components/dynamic-zone/manager';
import { generateMetadataObject } from '@/lib/shared/metadata';
import fetchContentType from '@/lib/strapi/fetchContentType';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    'events',
    { filters: { slug: params.slug }, populate: 'seo.metaImage' },
    true
  );
  return generateMetadataObject(pageData?.seo);
}

export default async function SingleEventPage({ params }: { params: { slug: string } }) {
  const event = await fetchContentType('events', { filters: { slug: params.slug } }, true);

  if (!event) {
    redirect('/events');
  }

  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <Container className="py-20 md:py-40">
        <SingleEvent event={event} />
        {event?.dynamic_zone && <DynamicZoneManager dynamicZone={event.dynamic_zone} />}
      </Container>
    </div>
  );
}
