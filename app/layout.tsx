import React from 'react';
import type { Viewport, Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { CartProvider } from '@/context/cart-context';
import { cn } from '@/lib/utils';
import { ViewTransitions } from 'next-view-transitions';
import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const dynamic = 'force-dynamic';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#06b6d4' },
    { media: '(prefers-color-scheme: dark)', color: '#06b6d4' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await fetchContentType(
    'global',
    {
      filters: { locale: 'fr' },
      populate: 'seo.metaImage',
    },
    true
  );
  return generateMetadataObject(pageData?.seo);
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageData = await fetchContentType('global', { filters: { locale: 'fr' } }, true);
  return (
    <html lang="fr" suppressHydrationWarning>
      <ViewTransitions>
        <CartProvider>
          <body className={cn(inter.className, 'bg-[#3A2416] antialiased h-full w-full')}>
            <Navbar data={pageData?.navbar} />
            {children}
            <Footer data={pageData?.footer} />
          </body>
        </CartProvider>
      </ViewTransitions>
    </html>
  );
}
