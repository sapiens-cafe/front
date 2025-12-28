'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '@/types/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { strapiImage } from '@/lib/strapi/strapiImage';
import { useSearchParams } from 'next/navigation';

export const FoodMenuImages = ({ product }: { product: Product }) => {
  const query = useMemo(() => new URLSearchParams(window.location.search), []);
  const [activeThumbnail, setActiveThumbnail] = useState(
    strapiImage(product.images[(query.get('index') as unknown as number) || 0].url)
  );

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setActiveThumbnail(
      strapiImage(product.images[(query.get('index') as unknown as number) || 0].url)
    );
  }, [query, product.images]);

  return (
    <div className="bg-gradient-to-b from-neutral-900 to-neutral-950 mx-auto px-4 md:px-10 xl:px-4 pt-40 pb-40">
      <div className="">
        <div>
          {/* <AnimatePresence initial={false} mode="popLayout"> */}
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            exit={{ x: 50 }}
            key={activeThumbnail}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 35,
            }}
            className="flex justify-center items-center "
          >
            <Image
              src={activeThumbnail}
              alt={product.name}
              width={600}
              height={600}
              // fill

              unoptimized={true}
            />
          </motion.div>
          {/* </AnimatePresence> */}
          <div className="flex gap-4 justify-center items-center mt-4">
            {product.images &&
              product.images.map((image, index) => (
                <button
                  onClick={() => setActiveThumbnail(strapiImage(image.url))}
                  key={'product-image' + index}
                  className={cn(
                    'h-20 w-20 rounded-xl',
                    activeThumbnail === image
                      ? 'border-2 border-neutral-200'
                      : 'border-2 border-transparent'
                  )}
                  style={{
                    backgroundImage: `url(${strapiImage(image.url)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
