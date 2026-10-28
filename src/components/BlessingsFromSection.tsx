import React from "react";
import { ScrollText } from "./ScrollReveal";

export interface FamilyBlessingGroup {
  relation: string;
  names: string;
}

interface BlessingsFromSectionProps {
  groups?: FamilyBlessingGroup[];
}

const DEFAULT_BLESSING_GROUPS: FamilyBlessingGroup[] = [
  {
    relation: "Dadaji & Dadiji",
    names: "late. Shri Bajrang lal Agarwal & Smt. Mina devi Agarwal",
  },

  {
    relation: "Chachaji & Chachiji",
    names: "late. Shri Sanjive kr. Agarwal & Smt. Suman Agarwal",
  },

  {
    relation: "BROTHER",
    names: "Vishal Agarwal",
  },

  {
    relation: "COUSINS",
    names: "Ankit Agarwal, Harsha Agarwal",
  },
];

export const BlessingsFromSection: React.FC<BlessingsFromSectionProps> = ({
  groups = DEFAULT_BLESSING_GROUPS,
}) => {
  return (
    <section className="w-full max-w-md mx-auto my-14 px-4 text-center">
      {/* Script Title */}
      <ScrollText delay={0.05} yOffset={25} blur={10}>
        <h2 className="font-script text-4xl sm:text-5xl text-[#6b1d2f] leading-tight mb-8 drop-shadow-xs">
          With Blessings From
        </h2>
      </ScrollText>

      {/* Clean Ivory Card */}
      <div className="bg-[#fffdf9] rounded-2xl p-7 sm:p-9 shadow-2xl border-2 border-amber-200/70 relative text-center text-[#2a241b]">
        {/* Subtle decorative inner border */}
        <div className="absolute inset-2.5 rounded-xl border border-amber-300/40 pointer-events-none" />

        <div className="space-y-6 sm:space-y-7">
          {groups.map((group, index) => (
            <ScrollText
              key={index}
              delay={0.1 + index * 0.08}
              yOffset={20}
              blur={8}
            >
              <div className="space-y-1">
                <p className="font-royal text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#6b1d2f] font-semibold">
                  {group.relation}
                </p>
                <p className="font-editorial text-base sm:text-lg text-[#d99a08] tracking-normal mt-2 leading-relaxed max-w-xs mx-auto text-center whitespace-normal break-words">
                  {group.names}
                </p>
              </div>
            </ScrollText>
          ))}
        </div>
      </div>
    </section>
  );
};
