import React from 'react';
import { Metadata } from 'next';
import { BlogLayout } from '@/components/blog-layout';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await fetchContentType(
    'articles',
    {
      filters: { slug: params.slug, locale: 'fr' },
      populate: 'seo.metaImage',
    },
    true
  );
  return generateMetadataObject(article?.seo);
}

export default async function SingleArticlePage({ params }: { params: { slug: string } }) {
  const article = await fetchContentType(
    'articles',
    { filters: { slug: params.slug, locale: 'fr' } },
    true
  );

  if (!article) {
    return <div>Blog not found</div>;
  }

  return (
    <BlogLayout article={article}>
      <BlocksRenderer content={article.content} />
    </BlogLayout>
  );
}
