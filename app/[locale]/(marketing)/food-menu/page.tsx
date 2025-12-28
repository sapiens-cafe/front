import React from 'react';

import fetchContentType from '@/lib/strapi/fetchContentType';

import { FoodMenuImages } from '@/components/food-menu-images';

export default async function FoodMenu({ params }: { params: { locale: string; slug: string } }) {
  const pageData = await fetchContentType(
    'food-menu',
    { filters: { locale: params.locale } },
    true
  );

  return <FoodMenuImages product={pageData} />;
}
