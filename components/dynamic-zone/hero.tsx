'use client';
import React from 'react';
import Link from 'next/link';
import ShootingStars from '../decorations/shooting-star';
import StarBackground from '../decorations/star-background';
import FirstSectionBackground from '../decorations/first-section-background';

import { Heading } from '../elements/heading';
import { Subheading } from '../elements/subheading';
import { Button } from '../elements/button';
import { Cover } from '../decorations/cover';
import { motion } from 'framer-motion';

export const Hero = ({
  heading,
  sub_heading,
  CTAs,
}: {
  heading: string;
  sub_heading: string;
  CTAs: any[];
}) => {
  return (
    <div className="overflow-hidden relative flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <FirstSectionBackground />
        <ShootingStars />
      </motion.div>

      <div className="absolute inset-x-0 bottom-0 h-80 w-full bg-gradient-to-t from-[#3A2416] to-transparent" />
    </div>
  );
};
