import React, { useEffect, useRef, useState } from 'react';

export interface CinematicRevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  children: React.ReactNode;
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  style?: React.CSSProperties;
  blurAmount?: number; // px, default 8
  yOffset?: number; // px, default 25
  threshold?: number;
  rootMargin?: string;
  id?: string;
}

/**
 * CinematicReveal component
 * Smoothly transitions elements from blur(8px), opacity 0, translateY(25px) to sharp, crystal-clear text/content.
 * Triggers strictly once per page load on scroll into viewport.
 * Remains permanently sharp and visible when scrolling back.
 * Honors prefers-reduced-motion.
 */
export const CinematicReveal: React.FC<CinematicRevealProps> = ({
  as: Component = 'div',
  children,
  delay = 0,
  duration = 950,
  className = '',
  style = {},
  blurAmount = 8,
  yOffset = 25,
  threshold = 0.1,
  rootMargin = '0px 0px -30px 0px',
  ...restProps
}) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState<boolean>(() => {
    // If client prefers reduced motion or window is undefined, reveal immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (isRevealed) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    const node = elementRef.current;
    if (!node) return;

    // Use IntersectionObserver with single-trigger behavior
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.disconnect(); // Triggers only once per page load
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isRevealed, threshold, rootMargin]);

  const transitionStyle: React.CSSProperties = isRevealed
    ? {
        opacity: 1,
        filter: 'blur(0px)',
        transform: 'translate3d(0, 0px, 0)',
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration + 50}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: 'opacity, filter, transform',
        ...style,
      }
    : {
        opacity: 0,
        filter: `blur(${blurAmount}px)`,
        transform: `translate3d(0, ${yOffset}px, 0)`,
        ...style,
      };

  return (
    <Component
      ref={elementRef}
      className={className}
      style={transitionStyle}
      {...restProps}
    >
      {children}
    </Component>
  );
};
