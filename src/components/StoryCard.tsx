import React from "react";
import { ScrollText } from "./ScrollReveal";

interface StoryCardProps {
  groomName: string;
  brideName: string;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  groomName,
  brideName,
}) => {
  return (
    <div id="story" className="w-full max-w-md mx-auto my-12 px-4 text-center">
      {/* Title in cursive script */}
      <ScrollText delay={0.05} yOffset={25} blur={10}>
        <h3 className="font-script text-3xl sm:text-4xl text-[#7a1f2d] mb-4">
          Our Story
        </h3>
      </ScrollText>

      <div className="w-12 h-px mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-6" />

      <div className="space-y-4 text-[13px] sm:text-sm text-[#5c5042] font-light leading-relaxed text-center sm:text-justify">
        <ScrollText delay={0.1} yOffset={20} blur={8}>
          <p>
            Our story did not begin with years of knowing each other. It began
            with two warm souls finding each other at exactly the right time.
          </p>
        </ScrollText>
        <ScrollText delay={0.15} yOffset={20} blur={8}>
          <p>
            From the very beginning, we found comfort in quiet moments, shared
            joy, and an unshakeable love for deep conversations and family
            traditions.
          </p>
        </ScrollText>
        <ScrollText delay={0.2} yOffset={20} blur={8}>
          <p>
            {brideName} brings graceful warmth and artistic vibrance, while{" "}
            {groomName} brings steady optimism, laughter, and an endless sense
            of wonder.
          </p>
        </ScrollText>
        <ScrollText delay={0.25} yOffset={20} blur={8}>
          <p>
            As we begin this sacred new chapter at KP Palace in Talcher,
            surrounded by the blessings of our parents and elders, we feel
            deeply grateful to celebrate the beginning of our forever with the
            people who mean the most to us!
          </p>
        </ScrollText>
      </div>
    </div>
  );
};
