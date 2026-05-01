import React from 'react';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { Event } from '@/types/types';
import { strapiImage } from '@/lib/strapi/strapiImage';
import dayjs from 'dayjs';
import { EventSubscriberModal } from './event-subscriber-modal';

export const Featured = ({ events }: { events: Event[] }) => {
  const eventsSorted = events.sort((a, b) =>
    a.datetime && b.datetime && a.datetime > b.datetime ? 1 : -1
  );
  return (
    <div className="py-20">
      <h2 className="text-2xl md:text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white mb-2">
        Événements à la une
      </h2>
      <p className="text-neutral-500 text-lg mt-4 mb-10">
        Choisissez parmi nos événements à venir les plus passionnants
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <FeaturedItem event={eventsSorted[0]} />
          <div className="mt-4">
            {dayjs(eventsSorted[0]?.datetime).isAfter(dayjs()) && (
              <EventSubscriberModal productId={eventsSorted[0].documentId} />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10"></div>
    </div>
  );
};

const FeaturedItem = ({ event }: { event: Event }) => {
  return (
    <Link
      href={`/events/${event.slug}` as never}
      className="group border border-neutral-800 rounded-md overflow-hidden relative block"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black transition-all duration-200 z-30" />
      <div className="absolute text-sm top-4 right-2 md:top-10 md:right-10 z-40 bg-white rounded-full pr-1 pl-4 py-1 text-black font-medium flex gap-4 items-center">
        <span>{event.name}</span>
        <span className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white px-2 py-1 rounded-full flex items-center gap-2">
          {dayjs(event.datetime).format('DD/MM/YYYY HH:mm')}
        </span>
      </div>
      <Image
        src={strapiImage(event.images[0].url)}
        alt={event.name}
        width={1000}
        height={1000}
        className="h-full w-full object-cover group-hover:scale-105 transition duration-200"
        unoptimized={true}
      />
    </Link>
  );
};
