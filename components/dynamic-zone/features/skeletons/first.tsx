'use client';
import React from 'react';

import Image from 'next/image';
import { strapiImage } from '@/lib/strapi/strapiImage';

export function SkeletonOne() {
  return (
    <div className="relative w-full h-full">
      <div className="mt-4">
        <div className="">
          <Image
            style={{
              width: '100%',
              height: 'auto',
            }}
            width={500}
            height={300}
            src={strapiImage('/uploads/IMG_20250627_WA_0010_9c3914904d.jpg')}
            unoptimized={true}
            alt="Description"
          />
        </div>
      </div>
    </div>
  );
}
