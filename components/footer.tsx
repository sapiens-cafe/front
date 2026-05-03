import React from 'react';
import { Logo } from '@/components/logo';
import { Link } from 'next-view-transitions';

const RESTAURANT_ADDRESS = '38 Rue Sibuet, 75012 Paris';
const MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=38+Rue+Sibuet,+75012+Paris&output=embed&z=16';
const MAPS_LINK_URL = 'https://maps.google.com/maps?q=38+Rue+Sibuet,+75012+Paris';

export const Footer = async ({ data }: { data: any }) => {
  const address = data?.address || RESTAURANT_ADDRESS;

  return (
    <div className="relative">
      <div className="border-t border-neutral-900 px-8 pt-20 pb-0 relative bg-primary">
        <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start pb-20">
          <div>
            <div className="mr-4  md:flex mb-4">
              {data?.logo?.image && <Logo image={data?.logo?.image} />}
            </div>
            <div className="max-w-xs">{data?.description}</div>
            <div className="mt-4">{data?.copyright}</div>
            <a
              href={MAPS_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-start gap-2 hover:text-neutral-300 transition-colors group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mt-0.5 flex-shrink-0 group-hover:text-neutral-300"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
              <span>{address}</span>
            </a>
            <div className="mt-10">
              Designed and Developed by{' '}
              <a className="text-white underline" href="https://aceternity.com">
                Najib Slassi
              </a>{' '}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
            <LinkSection links={data?.internal_links} />
            <LinkSection links={data?.policy_links} />
            <LinkSection links={data?.social_media_links} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto pb-16">
          <iframe
            src={MAPS_EMBED_URL}
            className="w-full h-64 md:h-80 rounded-xl border border-neutral-800"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Sapiens Café — 38 Rue Sibuet, 75012 Paris"
          />
        </div>
      </div>
    </div>
  );
};

const LinkSection = ({ links }: { links: { text: string; URL: never | string }[] }) => (
  <div className="flex justify-center space-y-4 flex-col mt-4">
    {links?.map((link) => (
      <Link
        key={link.text}
        className="transition-colors hover:text-neutral-400 text-muted text-xs sm:text-sm"
        href={link.URL}
      >
        {link.text}
      </Link>
    ))}
  </div>
);
