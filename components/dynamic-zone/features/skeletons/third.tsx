'use client';
import { cn } from '@/lib/utils';
import { motion, useAnimate } from 'framer-motion';
import React, { useState } from 'react';

export const SkeletonThree = () => {
  const [scope, animate] = useAnimate();
  const [animating, setAnimating] = useState(false);
  const enterAnimation = async () => {
    if (animating) return;

    setAnimating(true);
    await animate(
      '.message',
      {
        scale: [0, 1],
      },
      {
        duration: 0.4,
      }
    );
    setAnimating(false);
  };

  return (
    <div
      ref={scope}
      className="overflow-hidden h-full relative "
      onMouseEnter={enterAnimation}
    ></div>
  );
};

const Cover = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={cn(
        'border rounded-md px-1 py-0.5 mr-1 border-indigo-500 bg-indigo-500/10 text-white',
        className
      )}
    >
      {children}
    </span>
  );
};
