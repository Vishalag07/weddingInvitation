import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "motion/react";

import { ScrollReveal, ScrollText } from "./ScrollReveal";

/**
 * KolkataToOdishaTransit Component
 * Replicates the exact visual journey card from the user's video:
 * 1. Top: Kolkata Watercolor Artwork + KOLKATA title
 * 2. Middle: Vertical dashed flight corridor with an animated maroon airplane
 *    gliding smoothly downward from Kolkata to Odisha as the user scrolls.
 * 3. Bottom: Odisha Watercolor Artwork + ODISHA title
 */
export const KolkataToOdishaTransit: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");

  // Track scroll through this transit corridor
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  // Smooth plane travel with spring easing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious();

    if (previous === undefined || current === previous) return;

    setScrollDirection(current > previous ? "down" : "up");
  });

  // Calculate plane position along the vertical dashed path (0% to 100%)
  const planeTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  // Subtle natural aerodynamic banking/tilt as it flies
  const planeRotate = scrollDirection === "down" ? 180 : 0;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-md mx-auto my-14 px-3 sm:px-4 text-center select-none overflow-hidden"
    >
      {/* 
        1. KOLKATA ORIGIN CITY SECTION
      */}
      <ScrollReveal delay={0.05} className="mb-4">
        {/* Watercolor Illustration of Kolkata (Howrah Bridge over Hooghly River) */}

        <img
          src="/assets/kolkata_watercolor.jpg"
          alt="Kolkata Howrah Bridge Watercolor Artwork"
          className="w-full h-full object-cover select-none rounded-[2rem]"
          loading="lazy"
        />

        {/* City Title in Royal Maroon Serif matching user video */}
        <ScrollText delay={0.1}>
          <h4 className="font-royal text-2xl sm:text-3xl font-bold tracking-[0.28em] text-[#6b1d2f] uppercase mt-3">
            KOLKATA
          </h4>
        </ScrollText>
      </ScrollReveal>

      {/* 
        2. FLIGHT PATH CORRIDOR WITH ANIMATED AIRPLANE
      */}
      <div className="relative my-4 sm:my-6 flex flex-col items-center justify-center">
        {/* Vertical Dashed Flight Line */}
        <div className="relative h-44 sm:h-56 w-full flex items-center justify-center">
          <div className="w-0.5 h-full border-l-2 border-dashed border-[#bfa58a]/80" />

          {/* Animated Maroon Airplane */}
          <motion.div
            style={{
              top: planeTop,
              rotate: planeRotate,
            }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
          >
            {/* Subtle traveling radar ripple */}
            <div className="absolute inset-0 -m-2 rounded-full bg-[#6b1d2f]/10 animate-ping pointer-events-none" />

            {/* Solid Maroon Plane Icon matching user video */}
            <div className="relative p-1 filter drop-shadow-[0_4px_10px_rgba(107,29,47,0.4)]">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 sm:w-9 sm:h-9 text-[#6b1d2f] fill-[#6b1d2f]"
              >
                {/* Airplane SVG silhouette pointing down */}
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 
        3. ODISHA DESTINATION CITY SECTION
      */}
      <ScrollReveal delay={0.08} className="mt-4">
        {/* Watercolor Illustration of Odisha (KP Palace & Kalinga Temple Spire) */}
        <img
          src="/assets/odisha_watercolor.jpg"
          alt="Odisha KP Palace & Temple Watercolor Artwork"
          className="w-full h-full object-cover select-none rounded-[2rem]"
          loading="lazy"
        />

        {/* City Title in Royal Maroon Serif matching user video */}
        <ScrollText delay={0.12}>
          <h4 className="font-royal text-2xl sm:text-3xl font-bold tracking-[0.28em] text-[#6b1d2f] uppercase mt-3">
            ODISHA
          </h4>
        </ScrollText>
      </ScrollReveal>
    </div>
  );
};
