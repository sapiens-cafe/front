export interface MenuItem {
  id: number;
  name?: string;
  slug?: string;
  price?: number;
  images: any[];
}

export interface Category {
  name: string;
}

export interface Image {
  url: string;
  alternativeText: string;
}

export interface Article {
  title: string;
  description: string;
  slug: string;
  content: string;
  dynamic_zone: any[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  image: Image;
  categories: Category[];
}

export interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  audiences: any[];
  perks: any[];
  featured?: boolean;
  images: any[];
  categories?: any[];
  datetime?: string;
  documentId: string;
}
