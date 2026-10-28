import React from 'react';
import { ScrollText } from './ScrollReveal';

interface ThankYouPostcardSectionProps {
  fromLocation?: string;
  toLocation?: string;
  coupleNames?: string;
  weddingDateCode?: string;
  country?: string;
}

export const ThankYouPostcardSection: React.FC<ThankYouPostcardSectionProps> = ({
  fromLocation = 'Kolkata',
  toLocation = 'Odisha',
  coupleNames = 'Traiambak & Trisha',
  weddingDateCode = '11 · 02 · 27',
  country = 'INDIA',
}) => {
  return (
    <section className="w-full bg-[#5a1422] py-14 px-4 text-center relative overflow-hidden">
      {/* Decorative subtle background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Airmail Postcard Outer Border Wrapper */}
      <div
        className="w-full max-w-md mx-auto p-3.5 sm:p-4 rounded-3xl shadow-2xl relative"
        style={{
          background:
            'repeating-linear-gradient(45deg, #7a1f2d 0px, #7a1f2d 12px, #ffffff 12px, #ffffff 24px, #c59d5f 24px, #c59d5f 36px, #ffffff 36px, #ffffff 48px)',
        }}
      >
        {/* Inner Ivory Postcard Surface */}
        <div className="bg-[#fffdf9] rounded-2xl p-6 sm:p-8 text-left text-[#2a241b] shadow-inner relative">
          {/* Header Script */}
          <ScrollText delay={0.05} yOffset={25} blur={10}>
            <h3 className="font-script text-4xl sm:text-5xl text-[#6b1d2f] font-normal mb-4">
              Thank You
            </h3>
          </ScrollText>

          {/* Emotional message */}
          <ScrollText delay={0.1} yOffset={20} blur={8}>
            <p className="font-editorial text-sm sm:text-base text-[#4a3f35] leading-relaxed mb-6">
              for being part of our journey, from {fromLocation} to {toLocation}. Your love and blessings mean the world to us.
            </p>
          </ScrollText>

          {/* Signoff */}
          <ScrollText delay={0.15} yOffset={20} blur={8}>
            <div className="space-y-1 mb-6">
              <p className="text-xs font-editorial text-stone-600">With love,</p>
              <p className="font-script text-3xl sm:text-4xl text-[#6b1d2f]">
                {coupleNames}
              </p>
            </div>
          </ScrollText>

          {/* Thin Divider Line */}
          <div className="border-t border-stone-200 my-6" />

          {/* Postmark and Wax Seal Stamps Row */}
          <ScrollText delay={0.2} yOffset={20} blur={8}>
            <div className="flex items-center justify-around py-2 px-2 mb-6">
              {/* Circular Postmark Cancellation Stamp */}
              <div className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full border-2 border-dashed border-[#7a1f2d]/50 flex flex-col items-center justify-center p-2 text-center text-[#7a1f2d] select-none transform -rotate-6">
                <div className="absolute inset-1 rounded-full border border-[#7a1f2d]/30 pointer-events-none" />
                <span className="font-royal text-[9px] uppercase tracking-[0.25em] font-bold">
                  {toLocation}
                </span>
                <span className="font-mono text-xs font-semibold my-0.5 tracking-wider">
                  {weddingDateCode}
                </span>
                <span className="font-royal text-[8px] uppercase tracking-[0.2em] opacity-80">
                  {country}
                </span>
              </div>

              {/* Postage Stamp with Authentic Wax Seal */}
              <div className="relative w-24 h-28 sm:w-26 sm:h-30 bg-[#faf6ed] p-2 flex items-center justify-center shadow-md border border-stone-300/80 rounded-sm">
                {/* Postage Stamp Scalloped Edge Effect */}
                <div className="absolute inset-1 border border-stone-300/50 pointer-events-none" />

                {/* Red Wax Seal with Two Birds, Heart & Intertwined Rings */}
                <img
                  src="/assets/wax_seal_transparent.png"
                  alt="Royal Seal"
                  className="w-16 h-16 sm:w-18 sm:h-18 object-contain drop-shadow-md select-none"
                />
              </div>
            </div>
          </ScrollText>

          {/* "TO" Handwritten Address Section on Ruled Lines */}
          <ScrollText delay={0.25} yOffset={20} blur={8}>
            <div className="pt-2 space-y-2">
              <p className="font-royal text-[10px] uppercase tracking-[0.25em] text-[#b48332] font-semibold">
                TO
              </p>
              <div className="space-y-3 font-script text-2xl sm:text-3xl text-[#6b1d2f]">
                <p className="border-b border-stone-200/90 pb-1 leading-snug">
                  Our dear family
                </p>
                <p className="border-b border-stone-200/90 pb-1 leading-snug">
                  &amp; friends,
                </p>
                <p className="border-b border-stone-200/90 pb-1 leading-snug">
                  with all our love
                </p>
              </div>
            </div>
          </ScrollText>
        </div>
      </div>
    </section>
  );
};
