import React from 'react';
import { Container } from '../../container';
import { Heading } from '../../elements/heading';
import { Subheading } from '../../elements/subheading';
import { GradientContainer } from '../../gradient-container';
import { Card, CardDescription, CardTitle } from './card';
import { SkeletonOne } from './skeletons/first';
import { SkeletonTwo } from './skeletons/second';
import Image from 'next/image';
import { strapiImage } from '@/lib/strapi/strapiImage';
import { Link } from 'next-view-transitions';

const wordToNumber: { [key: string]: number } = {
  one: 1,
  two: 2,
  three: 3,
};

function convertWordToNumber(word: string) {
  return wordToNumber[word.toLowerCase()] || null;
}

export const Features = ({
  heading,
  sub_heading,
  globe_card,
  ray_card,
  graph_card,
  social_media_card,
}: {
  heading: string;
  sub_heading: string;
  globe_card: any;
  ray_card: any;
  graph_card: any;
  social_media_card: any;
}) => {
  return (
    <GradientContainer className="md:my-20">
      <Container className="py-20 max-w-7xl mx-auto  relative z-40">
        <Heading className="pt-4">{heading}</Heading>
        <Subheading className="max-w-3xl mx-auto">{sub_heading}</Subheading>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-10">
          {globe_card && (
            <Card className={`md:col-span-${convertWordToNumber(globe_card?.span) || '2'}`}>
              <CardTitle>{globe_card.title}</CardTitle>
              <CardDescription>{globe_card.description}</CardDescription>
              <SkeletonOne />
            </Card>
          )}

          {ray_card && (
            <Card className={`md:col-span-${convertWordToNumber(ray_card?.span) || '1'}`}>
              <Link className="cursor-pointer" href={`/fr/food-menu?index=0`}>
                <SkeletonTwo />
              </Link>
              <CardTitle>{ray_card.title}</CardTitle>
              <CardDescription>{ray_card.description}</CardDescription>
            </Card>
          )}

          {graph_card && (
            <Card className={`md:col-span-${convertWordToNumber(ray_card?.span) || '1'}`}>
              <Link className="cursor-pointer" href={`/fr/food-menu?index=1`}>
                <Image
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                  width={400}
                  height={300}
                  unoptimized={true}
                  src={strapiImage('/uploads/menu_drink_be72e65e69.png')}
                  alt="Description"
                />

                <CardTitle>{graph_card.title}</CardTitle>
                <CardDescription>{graph_card.description}</CardDescription>
              </Link>
            </Card>
          )}

          {social_media_card && (
            <Card className={`md:col-span-${convertWordToNumber(social_media_card?.span) || '1'}`}>
              <Image
                style={{
                  width: '100%',
                  height: 'auto',
                }}
                width={500}
                height={200}
                src={strapiImage('/uploads/indoor_no_text_7dd901a4d5.jpg')}
                unoptimized={true}
                alt="Description"
              />
            </Card>
          )}
        </div>
      </Container>
    </GradientContainer>
  );
};
