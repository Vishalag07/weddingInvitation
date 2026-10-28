/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { GateOpeningHero } from "./components/GateOpeningHero";
import { IvoryInvitationCard } from "./components/IvoryInvitationCard";
import { ScratchCard } from "./components/ScratchCard";
import { CountdownCard } from "./components/CountdownCard";
import { PhotoCarouselCard } from "./components/PhotoCarouselCard";
import { StoryCard } from "./components/StoryCard";
import { EventsCards } from "./components/EventsCards";
import { BlessingsFromSection } from "./components/BlessingsFromSection";
import { BoardingPassRsvpSection } from "./components/BoardingPassRsvpSection";
import { ThankYouPostcardSection } from "./components/ThankYouPostcardSection";
import { VinylPlayer } from "./components/VinylPlayer";
import { ScrollReveal } from "./components/ScrollReveal";
import { INITIAL_WEDDING_DATA } from "./data/defaultData";
import { WeddingData } from "./types/wedding";

export default function App() {
  const [weddingData] = useState<WeddingData>(() => {
    const saved = localStorage.getItem("triambak_trisha_wedding_data");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_WEDDING_DATA;
      }
    }
    return INITIAL_WEDDING_DATA;
  });

  const invitationRef = useRef<HTMLDivElement | null>(null);

  const handleScrollDown = () => {
    if (invitationRef.current) {
      invitationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#07080b] text-[#f7f3ea] font-sans selection:bg-[#c59d5f] selection:text-[#16120b] relative">
      {/* 
        1. ROYAL GATE OPENING (Replicating the user's video recording)
        - White floral rose & wisteria arch
        - Golden filigree palace gates
        - Silk ribbon with red wax seal & doves
        - "TAP TO BEGIN"
        - 3D gates swing open to night palace, full moon, and "Triambak weds Trisha"
        - "SCROLL DOWN" prompt (unlocks page scrolling)
      */}
      <GateOpeningHero
        groomName={weddingData.groom.name}
        brideName={weddingData.bride.name}
        onScrollDown={handleScrollDown}
      />

      {/* 
        2. INVITATION CARDS CONTAINER (Warm ivory & gold cards matching the recording)
      */}
      <main
        ref={invitationRef}
        className="relative z-10 w-full max-w-full overflow-x-clip bg-[#f7f3ea] text-[#2a241b] py-8 border-t-2 border-amber-400/40"
      >
        {/* Card 1: Official Sanskrit Shloka & Ivory Invitation Card */}
        <ScrollReveal delay={0.05}>
          <IvoryInvitationCard data={weddingData} />
        </ScrollReveal>

        {/* Card 2: With Blessings From (Image 1) */}
        <ScrollReveal delay={0.05}>
          <BlessingsFromSection />
        </ScrollReveal>

        {/* Card 3: Interactive Scratch Heart to Reveal Wedding Date (11 Feb 2027) */}
        <ScrollReveal delay={0.05}>
          <ScratchCard weddingDateDisplay={weddingData.dateDisplay} />
        </ScrollReveal>

        {/* Card 4: The Big Day Approaches Countdown Timer */}
        <ScrollReveal delay={0.05}>
          <CountdownCard targetDate={weddingData.weddingDate} />
        </ScrollReveal>

        {/* Card 5: Photo Carousel Stack */}
        <ScrollReveal delay={0.05}>
          <PhotoCarouselCard />
        </ScrollReveal>

        {/* Card 6 : Our Story narrative */}
        <ScrollReveal delay={0.05}>
          <StoryCard
            groomName={weddingData.groom.name}
            brideName={weddingData.bride.name}
          />
        </ScrollReveal>

        {/* Card 7: Wedding Events Cards (Haldi, Mehndi, Vivaha, Reception) */}
        <ScrollReveal delay={0.05}>
          <EventsCards
            ceremonies={weddingData.ceremonies}
            venueName={weddingData.venue.name}
            venueCity={weddingData.venue.city}
            venueState={weddingData.venue.state}
            venueAddress={weddingData.venue.fullAddress}
          />
        </ScrollReveal>

        {/* Card 8: Kindly Respond Boarding Pass RSVP (Image 2) */}
        <ScrollReveal delay={0.05}>
          <BoardingPassRsvpSection />
        </ScrollReveal>
      </main>

      {/* 3. Section 9: Thank You Airmail Postcard (Image 3) */}
      <ScrollReveal delay={0.05}>
        <ThankYouPostcardSection />
      </ScrollReveal>

      {/* Spinning Vinyl Record Music Player on Bottom Right */}
      <VinylPlayer />
    </div>
  );
}
