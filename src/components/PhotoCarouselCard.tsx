import React, { useState, useEffect, useRef } from "react";

interface PhotoItem {
  src: string;
  caption: string;
  subTitle?: string;
}

export const PhotoCarouselCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Touch gesture support
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const photos: PhotoItem[] = [
    {
      src: "/assets/couple_royal_portrait_1792920826549.jpg",
      caption: "Triambak & Trisha",
      subTitle: "A Royal Bond of Love & Grace",
    },
    {
      src: "/assets/hero_floodlit_palace_1792920824992.jpg",
      caption: "Reflections at Twilight",
      subTitle: "KP Palace Illuminated Under the Stars",
    },
    {
      src: "/assets/ceremony_festivities_1792920825776.jpg",
      caption: "Joyful Traditions",
      subTitle: "Laughter, Music & Eternal Blessings",
    },
    {
      src: "/assets/palace_mandap_venue_1792920826075.jpg",
      caption: "The Sacred Mandap",
      subTitle: "Where Seven Sacred Vows Are Made",
    },
  ];

  // Infinite loop auto-shuffle timer
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 3800);

    return () => clearInterval(timer);
  }, [isHovered, photos.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handleCardClick = (targetIndex: number) => {
    if (targetIndex === currentIndex) return;
    setCurrentIndex(targetIndex);
  };

  // Touch gesture handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // Determine styling and 3D positioning for each card in the loop
  const getCardTransform = (index: number) => {
    const diff = (index - currentIndex + photos.length) % photos.length;

    if (diff === 0) {
      // Middle / Active Card
      return {
        className:
          "z-30 scale-100 opacity-100 translate-x-0 cursor-default border-[6px] sm:border-8 border-[#fae8b4] shadow-[0_22px_50px_rgba(0,0,0,0.28)]",
        style: { transform: "translateX(0%) scale(1) translateZ(30px)" },
        isMiddle: true,
      };
    } else if (diff === 1) {
      // Right Flanking Card
      return {
        className:
          "z-20 scale-[0.84] opacity-70 cursor-pointer hover:opacity-90 transition-all filter brightness-[0.85] border-2 sm:border-[3px] border-[#fae8b4]/60 shadow-[0_12px_30px_rgba(0,0,0,0.25)]",
        style: { transform: "translateX(42%) scale(0.84) rotateY(-8deg)" },
        isMiddle: false,
      };
    } else if (diff === photos.length - 1) {
      // Left Flanking Card
      return {
        className:
          "z-20 scale-[0.84] opacity-70 cursor-pointer hover:opacity-90 transition-all filter brightness-[0.85] border-2 sm:border-[3px] border-[#fae8b4]/60 shadow-[0_12px_30px_rgba(0,0,0,0.25)]",
        style: { transform: "translateX(-42%) scale(0.84) rotateY(8deg)" },
        isMiddle: false,
      };
    } else {
      // Background hidden cards ready in queue
      return {
        className:
          "z-10 scale-[0.68] opacity-0 pointer-events-none translate-x-0",
        style: { transform: "translateX(0%) scale(0.68) translateZ(-80px)" },
        isMiddle: false,
      };
    }
  };

  return (
    <div
      className="w-full max-w-xl mx-auto my-10 px-2 sm:px-4 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Carousel Stage with Center and Flanking Side Photos */}
      <div className="relative h-[360px] sm:h-[420px] w-full flex items-center justify-center overflow-hidden perspective-[1200px]">
        {photos.map((photo, index) => {
          const config = getCardTransform(index);

          return (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              style={config.style}
              className={`absolute w-[66%] sm:w-[60%] aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-700 ease-out select-none ${config.className}`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay for Vignette and Depth */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${
                  config.isMiddle
                    ? "from-black/75 via-black/20 to-black/10"
                    : "from-black/80 via-black/40 to-black/30"
                }`}
              />

              {/* Side card click hint on hover */}
              {!config.isMiddle && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/30">
                  <span className="font-royal text-[11px] uppercase tracking-wider text-white font-semibold px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs border border-[#fae8b4]/60">
                    View
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
