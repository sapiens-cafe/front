import React from 'react';
import { Product } from '@/types/types';
import Image from 'next/image';
import { truncate } from '@/lib/utils';
import { Link } from 'next-view-transitions';
import { strapiImage } from '@/lib/strapi/strapiImage';
import dayjs from 'dayjs';
import { EventSubscriberModal } from './event-subscriber-modal';

const pastEventTitle = 'Événements passés';
const futureEventTitle = 'Événements à venir';

export const ProductItems = ({
  heading = 'Événements phares',
  sub_heading = 'Découvrez les rendez-vous qui ont captivé notre communauté.',
  products,
  locale,
}: {
  heading?: string;
  sub_heading?: string;
  products: Product[];
  locale: string;
}) => {
  const productsSortedBydatetimeDesc = products.sort((a, b) =>
    a.datetime && b.datetime ? new Date(b.datetime).getTime() - new Date(a.datetime).getTime() : 0
  );
  const pastProducts = productsSortedBydatetimeDesc.filter(
    (product) => product.datetime && new Date(product.datetime) < new Date()
  );
  const futureProducts = productsSortedBydatetimeDesc.filter(
    (product) => product.datetime && new Date(product.datetime) >= new Date()
  );
  return (
    <div className="py-20">
      {futureProducts.length > 0 && (
        <div>
          <h2 className="text-2xl md:text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white mb-2">
            {futureEventTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3  gap-20 mt-12">
            {futureProducts.map((product) => (
              <ProductItem
                key={'regular-product-item' + product.id}
                product={product}
                locale={locale}
              />
            ))}
          </div>
        </div>
      )}
      <h2 className="text-2xl md:text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white mb-2 mt-12">
        {pastEventTitle}
      </h2>
      <p className="text-neutral-500 text-lg mt-4 mb-10">{sub_heading}</p>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-20">
        {pastProducts.map((product) => (
          <ProductItem
            key={'regular-product-item' + product.id}
            product={product}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
};

const ProductItem = ({ product, locale }: { product: Product; locale: string }) => {
  console.log('product', product);
  return (
    <div>
      <Link href={`/${locale}/products/${product.slug}` as never} className="group relative block">
        <div className="relative border border-neutral-800  rounded-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black transition-all duration-200 z-30" />

          <Image
            src={strapiImage(product.images[0].url)}
            alt={product.name}
            width={600}
            height={600}
            className="h-full w-full object-cover group-hover:scale-105 transition duration-200 h-[500px]"
            unoptimized={true}
          />
        </div>

        <div className="mt-8">
          <div className="flex justify-between">
            <span className="text-white text-base font-medium">{product.name}</span>
            <span className="bg-white text-black shadow-derek text-xs px-2 py-1 rounded-full text-nowrap flex items-center">
              {dayjs(product.datetime).isAfter(dayjs().startOf('year'))
                ? dayjs(product.datetime).format('DD/MM HH:mm')
                : dayjs(product.datetime).format('DD/MM/YYYY HH:mm')}
            </span>
          </div>
          <p className="text-neutral-400 text-sm mt-4 mb-4">{truncate(product.description, 100)}</p>
        </div>
      </Link>
      {dayjs(product?.datetime).isAfter(dayjs()) && (
        <EventSubscriberModal productId={product.documentId} />
      )}
    </div>
  );
};
