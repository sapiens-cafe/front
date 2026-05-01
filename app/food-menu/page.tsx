import fetchContentType from '@/lib/strapi/fetchContentType';
import { FoodMenuImages } from '@/components/food-menu-images';

export default async function FoodMenu() {
  const pageData = await fetchContentType('food-menu', { filters: { locale: 'fr' } }, true);

  return <FoodMenuImages product={pageData} />;
}
