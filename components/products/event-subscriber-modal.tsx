'use client';
import React, { useState } from 'react';
import { Product } from '@/types/types';
import { cn } from '@/lib/utils';

import { Modal, ModalBody, ModalContent, ModalFooter, ModalTrigger } from '../ui/animated-modal';
import fetchStrapiApi from '@/lib/strapi/strapiApi';
import { Link } from 'next-view-transitions';
import { Button } from '../elements/button';

export const EventSubscriberModal = ({ productId }: { productId: string }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const addSubscriber = async () => {
    setIsAdding(true);
    fetchStrapiApi(
      'event-subscribers',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            firstname,
            lastname,
            email,
            phone,
            event: productId,
          },
        }),
      },
      true
    ).then(() => {
      setIsAdding(false);
      setEmail('');
      setFirstname('');
      setLastname('');
      setPhone('');
      setHasSubscribed(true);
    });
  };

  return (
    <Modal>
      <ModalTrigger className="w-full">{"S'inscrire"}</ModalTrigger>
      <ModalBody>
        <ModalContent>
          {hasSubscribed ? (
            <span className="text-black mb-4 block">
              {'Merci pour votre inscription à notre événement ! Nous avons hâte de vous y voir.'}
            </span>
          ) : (
            <div>
              <span className="text-black mb-4 block">
                {'Inscrivez vous à notre événement en remplissant le formulaire ci-dessous.'}
              </span>
              <input
                id="firstname"
                value={firstname}
                type="text"
                placeholder="Votre prénom"
                onChange={(e) => setFirstname(e.target.value)}
                className="block w-full bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-neutral-100 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 mb-4"
              />
              <input
                id="lastname"
                value={lastname}
                type="text"
                placeholder="Votre nom"
                onChange={(e) => setLastname(e.target.value)}
                className="block w-full bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-neutral-100 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 mb-4"
              />

              <input
                id="email"
                value={email}
                type="email"
                placeholder="Votre adresse e-mail"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-neutral-100 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6"
              />
              <input
                id="phone"
                value={phone}
                type="text"
                placeholder="Votre numéro de téléphone"
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full bg-neutral-900 px-4 rounded-md border-0 py-1.5  shadow-aceternity text-neutral-100 placeholder:text-gray-400 focus:ring-2 focus:ring-neutral-400 focus:outline-none sm:text-sm sm:leading-6 mt-4"
              />

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  checked={hasAgreedToTerms}
                  onChange={() => setHasAgreedToTerms(!hasAgreedToTerms)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="checkbox" className="ml-2 block text-sm text-neutral-500">
                  {
                    "J'accepte que mes données soient utilisées conformément à la politique de confidentialité."
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
              disabled={!email || !hasAgreedToTerms || isAdding}
              className="py-3 w-80"
              onClick={() => addSubscriber()}
            >
              {isAdding ? (
                <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-current" />
              ) : (
                <span>{"S'inscrire à l'événement"}</span>
              )}
            </Button>
          )}
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};
