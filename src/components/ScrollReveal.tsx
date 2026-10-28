import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: number;
  once?: boolean;
  amount?: number;
}

/**
 * ScrollReveal:
 * Subtle, stable entrance reveal that dissolves from blur to sharp clarity
 * without displacing or shifting the page upward.
 * Executes strictly once per load.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.9,
  yOffset = 10,
  blur = 8,
  once = true,
  amount = 0.1,
  ...rest
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur}px)`,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{
  once: true,
  amount: 0,
  margin: '0px 0px 200px 0px',
}}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScrollText:
 * Gentle blur-to-sharp text focus without vertical displacement,
 * keeping page layout completely stationary while scrolling.
 * Runs once per load.
 */
export const ScrollText: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: number;
  once?: boolean;
}> = ({
  children,
  className = '',
  delay = 0.05,
  duration = 0.85,
  yOffset = 4,
  blur = 6,
  once = true,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        filter: `blur(${blur}px)`,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{
        once: true,
        amount: 0.15,
        margin: '0px 0px -10px 0px',
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
