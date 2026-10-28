import React from "react";
import { WeddingData } from "../types/wedding";
import { ScrollText } from "./ScrollReveal";

interface IvoryInvitationCardProps {
  data: WeddingData;
}

export const IvoryInvitationCard: React.FC<IvoryInvitationCardProps> = ({
  data,
}) => {
  return (
    <div className="w-full max-w-md mx-auto my-12 px-4">
      {/* Ivory Card Container with gold/stone border */}
      <div className="bg-[#fffdf9] rounded-2xl p-7 sm:p-9 shadow-2xl border-2 border-amber-200/70 relative text-center text-[#2a241b]">
        {/* Subtle decorative inner border */}
        <div className="absolute inset-2.5 rounded-xl border border-amber-300/40 pointer-events-none" />

        {/* Sacred Lord Ganesha Motif */}
        <ScrollText delay={0.05} yOffset={20} blur={8}>
          <div className="flex justify-center mb-2">
            <img
              src="/assets/logo.png"
              alt="Lord Ganesha"
              className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
            />
          </div>

          <div className="text-sm text-[#800020] font-serif font-bold tracking-wide mb-2 select-none">
            ॥ श्री गणेशाय नमः ॥
          </div>
        </ScrollText>

        {/* Sanskrit Shloka */}
        <ScrollText delay={0.1} yOffset={20} blur={8}>
          <p className="font-editorial text-xs sm:text-sm text-[#B8860B] tracking-wide mb-1 leading-relaxed">
            ॐ वक्रतुण्ड महाकाय, सूर्यकोटि समप्रभ |
          </p>
          <p className="font-editorial text-xs sm:text-sm text-[#B8860B] tracking-wide mb-1 leading-relaxed">
            निर्विघ्नं कुरु मे देव, सर्वकार्येषु सर्वदा ||
          </p>
        </ScrollText>

        <div className="w-16 h-px mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent my-4" />

        {/* Cursive script invitation title */}
        <ScrollText delay={0.15} yOffset={25} blur={10}>
          <h2 className="font-script text-3xl sm:text-4xl text-[#7a1f2d] font-normal mb-3">
            We Cordially Invite You
          </h2>

          <p className="text-sm sm:text-base text-[#5c5042] font-light leading-relaxed max-w-sm mx-auto mb-6">
            Together with our beloved families, we request the honour of your
            gracious presence to celebrate the wedding of
          </p>
        </ScrollText>

        {/* Groom Section */}
        <ScrollText delay={0.2} yOffset={25} blur={10}>
          <div className="space-y-1 mb-4">
            <h3 className="font-script text-4xl sm:text-5xl text-[#C65365]">
              {data.groom.name}
            </h3>
            <p className="text-[11px] tracking-wider text-[#7a6b58] font-medium">
              Son of
            </p>
            <p className="font-editorial text-base sm:text-lg text-[#d99a08] tracking-wide mt-2 leading-relaxed">
              {data.groom.parents}
            </p>
          </div>
        </ScrollText>

        {/* "With" script divider */}
        <ScrollText delay={0.25} yOffset={20} blur={8}>
          <div className="text-[11px] tracking-[0.3em] text-[#665545] font-medium mb-4">
            With
          </div>
        </ScrollText>

        {/* Bride Section */}
        <ScrollText delay={0.3} yOffset={25} blur={10}>
          <div className="space-y-1 mb-6">
            <h3 className="font-script text-4xl sm:text-5xl text-[#C65365]">
              {data.bride.name}
            </h3>
            <p className="text-[11px] tracking-wider text-[#7a6b58] font-medium">
              Daughter of
            </p>
            <p className="font-editorial text-base sm:text-lg text-[#d99a08] tracking-wide mt-2 leading-relaxed">
              {data.bride.parents}
            </p>
          </div>
        </ScrollText>
      </div>
    </div>
  );
};
