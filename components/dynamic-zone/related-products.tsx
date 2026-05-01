'use client';
import React from 'react';

import { EventItems } from '@/components/events/event-items';

export const RelatedProducts = ({
  heading,
  sub_heading,
  events,
}: {
  heading: string;
  sub_heading: string;
  events: any[];
}) => {
  return (
    <div className="mt-10">
      <EventItems heading={heading} sub_heading={sub_heading} events={events} />
    </div>
  );
};
