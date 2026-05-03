import React from 'react';
import { Event } from '@/types/types';
import Image from 'next/image';
import { truncate } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import { strapiImage } from '@/lib/strapi/strapiImage';
import { dayjs } from '@/lib/dayjs-config';
import { EventSubscriberModal } from './event-subscriber-modal';

const pastEventTitle = 'Événements passés';
const futureEventTitle = 'Événements à venir';

export const EventItems = ({
  sub_heading = 'Découvrez les rendez-vous qui ont captivé notre communauté.',
  events,
}: {
  heading?: string;
  sub_heading?: string;
  events: Event[];
}) => {
  const now = new Date();
  const pastEvents = events
    .filter((event) => event.datetime && new Date(event.datetime) < now)
    .sort((a, b) => new Date(b.datetime!).getTime() - new Date(a.datetime!).getTime());
  const futureEvents = events
    .filter((event) => event.datetime && new Date(event.datetime) >= now)
    .sort((a, b) => new Date(a.datetime!).getTime() - new Date(b.datetime!).getTime());
  return (
    <div className="py-20">
      {futureEvents.length > 0 && (
        <div>
          <h2 className="text-2xl md:text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white mb-2">
            {futureEventTitle} ({futureEvents.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-12">
            {futureEvents.map((event) => (
              <EventItem key={'event-item-' + event.id} event={event} />
            ))}
          </div>
        </div>
      )}
      <h2 className="text-2xl md:text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white mb-2 mt-12">
        {pastEventTitle}
      </h2>
      <p className="text-neutral-500 text-lg mt-4 mb-10">{sub_heading}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {pastEvents.map((event) => (
          <EventItem key={'event-item-' + event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

const EventItem = ({ event }: { event: Event }) => {
  return (
    <div>
      <Link href={`/events/${event.slug}` as never} className="group relative block">
        <div className="relative border border-neutral-800 rounded-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black transition-all duration-200 z-30" />
          <Image
            src={strapiImage(event.images[0].url)}
            alt={event.name}
            width={600}
            height={600}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-200 h-[500px]"
            unoptimized={true}
          />
        </div>
        <div className="mt-8">
          <div className="flex justify-between">
            <span className="text-white text-base font-medium">{event.name}</span>
            <span className="bg-white text-black shadow-derek text-xs px-2 py-1 rounded-full text-nowrap flex items-center">
              {dayjs
                .utc(event.datetime)
                .tz('Europe/Paris')
                .isAfter(dayjs().tz('Europe/Paris').startOf('year'))
                ? dayjs.utc(event.datetime).tz('Europe/Paris').format('DD/MM HH:mm')
                : dayjs.utc(event.datetime).tz('Europe/Paris').format('DD/MM/YYYY HH:mm')}
            </span>
          </div>
          <p className="text-neutral-400 text-sm mt-4 mb-4">{truncate(event.description, 100)}</p>
        </div>
      </Link>
      {dayjs.utc(event?.datetime).tz('Europe/Paris').isAfter(dayjs().tz('Europe/Paris')) && (
        <EventSubscriberModal productId={event.documentId} />
      )}
    </div>
  );
};
