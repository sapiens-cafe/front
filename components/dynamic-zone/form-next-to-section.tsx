'use client';

import StarBackground from '@/components/decorations/star-background';
import ShootingStars from '@/components/decorations/shooting-star';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

import Link from 'next/link';
import { IconBrandInstagram } from '@tabler/icons-react';

import { Button } from '../elements/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function FormNextToSection({
  heading,
  sub_heading,
  form,
  section,
}: {
  heading: string;
  sub_heading: string;
  form: any;
  section: any;
}) {
  const socials = [
    {
      title: 'instagram',
      href: 'https://www.instagram.com/sapiens.cafe.paris?igsh=N29jY3dkb3Q5OGFos',
      icon: <IconBrandInstagram className="h-5 w-5 text-muted  hover:text-neutral-100" />,
    },
  ];

  const [values, setValues] = useState(
    form.inputs.reduce((acc: any, input: any) => {
      acc[input.name] = '';
      return acc;
    }, {})
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues((prev: any) => ({ ...prev, [name]: value }));
  };

  const postEmail = (data: any) =>
    fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: data }),
    });

  return (
    <div className="w-full min-h-screen grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
      <div className="flex relative z-20 items-center w-full justify-center px-4 py-4 lg:py-40 sm:px-6 lg:flex-none lg:px-20  xl:px-24">
        <div className="mx-auto w-full max-w-md">
          <div>
            <h1 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white">
              {heading}
            </h1>
            <p className="mt-4 text-muted   text-sm max-w-sm">{sub_heading}</p>
            <p className="mt-4 text-muted   text-sm max-w-sm">
              Vous pouvez aussi nous appeler au :{' '}
              <strong>
                <a href="tel:+33140199973">+33 1 40 19 99 73</a>
              </strong>
            </p>
          </div>

          <div className="pt-5 pb-10">
            <div>
              <form
                className="space-y-4"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const data = Object.entries(values)
                    .filter(([key]) => key.toLowerCase() !== 'submit')
                    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
                    .join('');
                  if (isSubmitting) return;
                  setIsSubmitting(true);
                  postEmail(data)
                    .then(() => {
                      alert('Message envoyé avec succès ✅');
                    })
                    .finally(() => {
                      setIsSubmitting(false);
                    });
                }}
              >
                {form &&
                  form?.inputs?.map((input: any) => (
                    <>
                      {input.type !== 'submit' && (
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-neutral-400 "
                        >
                          {input.name}
                        </label>
                      )}

                      <div className="mt-2">
                        {input.type === 'textarea' ? (
                          <textarea
                            rows={5}
                            id="message"
                            placeholder={input.placeholder}
                            value={values[input.name] || ''}
                            onChange={(e) => handleChange(input.name, e.target.value)}
                            className="block w-full bg-neutral-900  px-4 rounded-md border-0 py-1.5  shadow-aceternity text-neutral-100 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 "
                          />
                        ) : input.type === 'submit' ? (
                          <div>
                            <Button className="w-full mt-6" disabled={isSubmitting}>
                              {isSubmitting ? (
                                <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
                              ) : (
                                input.name
                              )}
                            </Button>
                          </div>
                        ) : (
                          <input
                            id="name"
                            value={values[input.name] || ''}
                            type={input.type}
                            placeholder={input.placeholder}
                            onChange={(e) => handleChange(input.name, e.target.value)}
                            className="block w-full bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-neutral-100 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 "
                          />
                        )}
                      </div>
                    </>
                  ))}
              </form>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 py-4">
            {socials.map((social) => (
              <Link href={social.href} target="_blank" key={social.title}>
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="relative w-full z-20 hidden md:flex border-l border-charcoal overflow-hidden bg-neutral-900 items-center justify-center">
        <StarBackground />
        <ShootingStars />
        <div className="max-w-sm mx-auto">
          <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={section.users} />
          </div>
          <p className={'font-semibold text-xl text-center  text-muted text-balance'}>
            {section.heading}
          </p>
          <p className={'font-normal text-base text-center text-neutral-500  mt-8 text-balance'}>
            {section.sub_heading}
          </p>
        </div>
      </div>
    </div>
  );
}
