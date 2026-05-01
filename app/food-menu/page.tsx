import { Suspense } from 'react';
import { type Metadata } from 'next';
import { notFound } from 'next/navigation';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { FoodMenuImages } from '@/components/food-menu-images';

export const metadata: Metadata = {
  title: 'Notre carte — Sapiens Café',
  description: 'Découvrez notre carte : boissons, petite restauration et spécialités du Sapiens Café.',
};

export default async function FoodMenu() {
  const pageData = await fetchContentType('food-menu', { filters: { locale: 'fr' } }, true);

  if (!pageData || !pageData.images?.length) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="pt-40 pb-40 flex justify-center">Chargement...</div>}>
      <FoodMenuImages product={pageData} />
    </Suspense>
  );
}
