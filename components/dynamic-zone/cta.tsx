'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../elements/button';
import { AmbientColor } from '../decorations/ambient-color';
import { Container } from '../container';
import Link from 'next/link';
import fetchStrapiApi from '@/lib/strapi/strapiApi';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from '../ui/animated-modal';
import { cn } from '@/lib/utils';

export const CTA = ({
  heading,
  sub_heading,
  CTAs,
  locale,
}: {
  heading: string;
  sub_heading: string;
  CTAs: any[];
  locale: string;
}) => {
  const [email, setEmail] = React.useState('');
  const [enabled, setEnabled] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [hasSubscribed, setHasSubscribed] = React.useState(false);
  const addEmail = async () => {
    setIsFetching(true);
    fetchStrapiApi(
      'subscribers',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { email } }),
      },
      true
    ).then(() => {
      setIsFetching(false);
      setEmail('');
      setEnabled(false);
      setHasSubscribed(true);
    });
  };
  return (
    <div className="relative py-40">
      <AmbientColor />
      <Container className="flex flex-col md:flex-row justify-between items-center w-full px-8">
        <div className="flex flex-col">
          <motion.h2 className="text-white text-xl text-center md:text-left md:text-3xl font-bold mx-auto md:mx-0 max-w-xl ">
            {heading}
          </motion.h2>
          <p className="max-w-md mt-8 text-center md:text-left text-sm md:text-base mx-auto md:mx-0 text-neutral-400">
            {sub_heading}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Modal>
            <ModalTrigger className="mt-10 w-full">{"S'inscrire à la newsletter"}</ModalTrigger>
            <ModalBody>
              <ModalContent>
                {hasSubscribed ? (
                  <span className="text-black mb-4 block">
                    {'Merci pour votre abonnement ! Vous recevrez bientôt nos mises à jour.'}
                  </span>
                ) : (
                  <div>
                    <span className="text-black mb-4 block">
                      {'Abonnez-vous à notre newsletter pour recevoir les dernières nouvelles.'}
                    </span>
                    <input
                      id="email"
                      value={email}
                      type="email"
                      placeholder="Votre adresse e-mail"
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-neutral-100 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
                    />

                    <div className="flex items-center mt-4">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => setEnabled(!enabled)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="checkbox" className="ml-2 block text-sm text-neutral-500">
                        {
                          "J'accepte de recevoir des communications par e-mail. Je comprends que je peux me désabonner à tout moment."
                        }
                      </label>
                    </div>
                    <Link href="fr/general-conditions" target="_blank">
                      <p className={cn('text-sm mt-4 text-neutral-500 underline cursor-pointer')}>
                        {'Lire la politique de confidentialité'}
                      </p>
                    </Link>
                  </div>
                )}
              </ModalContent>
              <ModalFooter>
                {!hasSubscribed && (
                  <Button
                    disabled={!email || !enabled || isFetching}
                    className="py-3 w-80"
                    onClick={() => addEmail()}
                  >
                    {isFetching ? (
                      <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
                    ) : (
                      <span>{"S'inscrire à la newsletter"}</span>
                    )}
                  </Button>
                )}
              </ModalFooter>
            </ModalBody>
          </Modal>
        </div>
      </Container>
    </div>
  );
};
