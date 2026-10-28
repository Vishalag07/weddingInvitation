import React from "react";
import { MapPin } from "lucide-react";
import { Ceremony } from "../types/wedding";
import { ScrollReveal, ScrollText } from "./ScrollReveal";
import { KolkataToOdishaTransit } from "./KolkataToOdishaTransit";

interface EventsCardsProps {
  ceremonies: Ceremony[];
  venueName: string;
  venueCity: string;
  venueState: string;
  venueAddress: string;
}

export const EventsCards: React.FC<EventsCardsProps> = ({
  ceremonies,
  venueName,
  venueCity,
  venueState,
  venueAddress,
}) => {
  return (
    <div
      id="events"
      className="w-full max-w-lg mx-auto my-12 px-3 sm:px-4 text-center"
    >
      {/* Section Header */}
      <ScrollText delay={0.05} yOffset={25} blur={10}>
        <h3 className="font-script text-3xl sm:text-4xl text-[#7a1f2d] mb-6">
          Wedding Events
        </h3>
      </ScrollText>

      <div className="space-y-8">
        {ceremonies.map((ceremony, index) => (
          <React.Fragment key={ceremony.id}>
            <ScrollReveal
              delay={0.05 + index * 0.05}
              className="bg-[#fffdf9] rounded-2xl p-5 sm:p-6 shadow-xl border border-amber-200/70 text-[#2a241b] overflow-hidden"
            >
              {/* Event Title in gold cursive script */}
              <ScrollText delay={0.05} yOffset={15} blur={6}>
                <h4 className="font-script text-3xl sm:text-4xl text-[#b48332] mb-1">
                  {ceremony.name.split("&")[0].trim()}
                </h4>
              </ScrollText>

              {/* Date & Time */}
              <ScrollText delay={0.1} yOffset={15} blur={6}>
                <p className="font-royal text-xs uppercase tracking-widest text-[#3d3328] font-bold mb-0.5">
                  {ceremony.date}
                </p>
                <p className="font-royal text-[11px] uppercase tracking-wider text-[#7a6b58] font-semibold mb-4">
                  {ceremony.time}
                </p>
              </ScrollText>

              {/* Event Video with Theme Gold Border */}
              <div className="mx-auto relative aspect-[9/16] w-[85%] max-w-[280px] rounded-xl overflow-hidden border-[3px] sm:border-[4px] border-[#e8c77e] ring-1 ring-[#c99a45]/25 mb-4 shadow-md bg-[#fefbf6]">
                <video
                  src={ceremony.videoUrl}
                  className="w-full h-full object-cover rounded-xl"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-xl" />
              </div>

              {/* Venue Label */}
              <ScrollText delay={0.15} yOffset={15} blur={6}>
                <div className="space-y-0.5 mb-4">
                  <p className="font-royal text-[10px] uppercase tracking-[0.2em] text-[#7a6b58] font-semibold">
                    VENUE
                  </p>
                  <h5 className="font-royal text-base sm:text-lg font-bold text-[#b48332] tracking-wider uppercase">
                    {ceremony.venueName || venueName}
                  </h5>
                  <p className="text-xs text-[#5c5042]">
                    {ceremony.venueAddress || `${venueCity}, ${venueState}`}
                  </p>
                </div>
              </ScrollText>

              {/* Actions */}
              <div className="flex items-center justify-center pt-3">
                <a
                  href={
                    ceremony.googleMapsUrl ||
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      ceremony.venueAddress || venueAddress,
                    )}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fffdf9] border border-[#b48332] px-6 py-3 text-xs font-royal uppercase tracking-widest text-[#b48332] font-semibold shadow-md transition-all duration-300 hover:bg-[#b48332] hover:text-white hover:shadow-lg active:scale-95"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open in Maps</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Flight Transit Animation (Kolkata to Odisha) immediately after Mehndi */}
            {ceremony.id.toLowerCase() === "mehndi" && (
              <KolkataToOdishaTransit />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
