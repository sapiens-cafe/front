'use client';
import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/types/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { strapiImage } from '@/lib/strapi/strapiImage';
import { useSearchParams } from 'next/navigation';

export const FoodMenuImages = ({ product }: { product: MenuItem }) => {
  const searchParams = useSearchParams();
  const index = parseInt(searchParams.get('index') || '0', 10);
  const safeIndex = product.images?.[index] ? index : 0;

  const [activeThumbnail, setActiveThumbnail] = useState(
    strapiImage(product.images[safeIndex].image.url)
  );

  useEffect(() => {
    setActiveThumbnail(strapiImage(product.images[safeIndex].image.url));
  }, [safeIndex, product.images]);

  return (
    <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 mx-auto px-4 md:px-10 xl:px-4 pt-40 pb-40">
      <div>
        <motion.div
          initial={{ x: 50 }}
          animate={{ x: 0 }}
          exit={{ x: 50 }}
          key={activeThumbnail}
          transition={{ type: 'spring', stiffness: 260, damping: 35 }}
          className="flex justify-center items-center"
        >
          <Image
            src={activeThumbnail}
            alt={product.images[safeIndex]?.image.alternativeText || 'Menu Sapiens Café'}
            width={600}
            height={600}
            unoptimized={true}
          />
        </motion.div>
        <div className="flex gap-4 justify-center items-center mt-4">
          {product.images.map((item, idx) => (
            <button
              onClick={() => setActiveThumbnail(strapiImage(item.image.url))}
              key={'menu-image-' + idx}
              className={cn(
                'h-20 w-20 rounded-xl',
                activeThumbnail === strapiImage(item.image.url)
                  ? 'border-2 border-neutral-200'
                  : 'border-2 border-transparent'
              )}
              style={{
                backgroundImage: `url(${strapiImage(item.image.url)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
