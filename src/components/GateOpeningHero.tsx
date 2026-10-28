import React, { useState, useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import confetti from "canvas-confetti";
import { weddingAudio } from "../utils/audioPlayer";

interface GateOpeningHeroProps {
  groomName: string;
  brideName: string;
  onScrollDown: () => void;
  onScrollUnlocked?: () => void;
}

const DIYA_PARTICLES = [
  {
    top: "14%",
    left: "10%",
    size: "w-1.5 h-1.5",
    bg: "bg-amber-200/60",
    delay: "0s",
    duration: "6s",
  },
  {
    top: "32%",
    left: "25%",
    size: "w-1.5 h-1.5",
    bg: "bg-amber-300/50",
    delay: "2s",
    duration: "5.5s",
  },
  {
    top: "40%",
    left: "75%",
    size: "w-1 h-1",
    bg: "bg-yellow-200/60",
    delay: "0.8s",
    duration: "6.5s",
  },
  {
    top: "58%",
    left: "90%",
    size: "w-1.5 h-1.5",
    bg: "bg-amber-100/60",
    delay: "1s",
    duration: "6s",
  },
  {
    top: "66%",
    left: "28%",
    size: "w-1 h-1",
    bg: "bg-amber-300/50",
    delay: "3s",
    duration: "5.5s",
  },
  {
    top: "86%",
    left: "18%",
    size: "w-1.5 h-1.5",
    bg: "bg-amber-100/60",
    delay: "0.5s",
    duration: "6.5s",
  },
  {
    top: "18%",
    left: "52%",
    size: "w-1 h-1",
    bg: "bg-yellow-100/50",
    delay: "2.8s",
    duration: "5.8s",
  },
  {
    top: "80%",
    left: "58%",
    size: "w-1 h-1",
    bg: "bg-yellow-100/50",
    delay: "3.2s",
    duration: "6s",
  },
];

export const GateOpeningHero: React.FC<GateOpeningHeroProps> = ({
  groomName,
  brideName,
  onScrollDown,
  onScrollUnlocked,
}) => {
  // Staged animation steps:
  // 0: Initial state - closed golden doors with silk ribbon & wax seal ("TAP TO BEGIN")
  // 1: Video is playing (clean view, temple doors swing open, Lord Ganesha revealed)
  // --- AFTER VIDEO ENDS: ---
  // 2: Groom's name (Triambak) gently reveals
  // 3: "WEDS" shimmers in
  // 4: Bride's name (Trisha) reveals
  // 5: "SCROLL DOWN" appears
  const [step, setStep] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textAnimationStartedRef = useRef(false);

  const onScrollUnlockedRef = useRef(onScrollUnlocked);
  onScrollUnlockedRef.current = onScrollUnlocked;

  // Scroll lock effect: Lock all page scrolling until the "SCROLL DOWN" option appears (step >= 5)
  useEffect(() => {
    if (step < 5) {
      if (window.scrollY > 0) {
        window.scrollTo(0, 0);
      }

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      const prevBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Prevent touch gestures from scrolling on mobile
      const preventTouchMove = (e: TouchEvent) => {
        if (e.cancelable) {
          e.preventDefault();
        }
      };

      // Prevent wheel scroll on desktop / touchpads
      const preventWheel = (e: WheelEvent) => {
        if (e.cancelable) {
          e.preventDefault();
        }
      };

      // Prevent scroll keys (Arrows, PageUp/Down, Space, Home, End)
      const preventKeyScroll = (e: KeyboardEvent) => {
        const scrollKeys = [
          "Space",
          "ArrowUp",
          "ArrowDown",
          "PageUp",
          "PageDown",
          "Home",
          "End",
        ];
        if (
          scrollKeys.includes(e.code) ||
          [32, 33, 34, 35, 36, 38, 40].includes(e.keyCode)
        ) {
          const target = e.target as HTMLElement | null;
          if (
            target &&
            (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
          ) {
            return;
          }
          if (e.cancelable) {
            e.preventDefault();
          }
        }
      };

      window.addEventListener("wheel", preventWheel, { passive: false });
      window.addEventListener("touchmove", preventTouchMove, {
        passive: false,
      });
      window.addEventListener("keydown", preventKeyScroll);

      return () => {
        document.body.style.overflow = prevBodyOverflow;
        window.removeEventListener("wheel", preventWheel);
        window.removeEventListener("touchmove", preventTouchMove);
        window.removeEventListener("keydown", preventKeyScroll);
      };
    } else {
      // Step >= 5: Scroll down option is shown! Re-enable normal scrolling immediately
      document.body.style.overflow = "";
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
      onScrollUnlockedRef.current?.();
    }
  }, [step]);

  // Initialize and force decode first video frame (closed golden doors) immediately
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      if (video.currentTime === 0) {
        try {
          video.currentTime = 0.01;
        } catch {
          // ignore
        }
      }
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, []);

  // Starts the sequential text animations AFTER the video ends
  const startTextAnimation = () => {
    if (textAnimationStartedRef.current) return;
    textAnimationStartedRef.current = true;

    // Small delay ensures DOM paints initial translate-y-12 state before transitioning
    setTimeout(() => {
      // 1. Groom's name floats upward!
      setStep(2);
    }, 120);

    // 2. "WEDS" reveals
    setTimeout(() => {
      setStep(3);
    }, 1600);

    // 3. Bride's name reveals
    setTimeout(() => {
      setStep(4);
    }, 3100);

    // 4. "SCROLL DOWN" reveals & page scroll unlocks
    setTimeout(() => {
      setStep(5);
    }, 4500);
  };

  const handleOpenGate = async () => {
    if (step > 0) return;

    // Step 1: Start video playback (clean view without text)
    setStep(1);
    textAnimationStartedRef.current = false;

    // Play video
    if (videoRef.current) {
      try {
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (err) {
        console.warn("Video playback notice:", err);
      }
    }

    // Play traditional auspicious audio
    weddingAudio.play();

    // Golden celebratory confetti burst
    try {
      confetti({
        particleCount: 55,
        spread: 85,
        origin: { y: 0.5 },
        colors: ["#e7c87c", "#f59e0b", "#d97706", "#fffbeb", "#991b1b"],
        ticks: 200,
      });
    } catch {
      // ignore
    }

    // Safety fallback: in case onEnded doesn't fire, start text sequence after video duration
    const duration = videoRef.current?.duration
      ? videoRef.current.duration * 1000 + 400
      : 7200;
    setTimeout(() => {
      startTextAnimation();
    }, duration);
  };

  const handleVideoEnded = () => {
    // Start text animation sequence right after the video ends!
    startTextAnimation();
  };

  return (
    <section className="relative w-full max-w-full h-screen h-[100dvh] sm:min-h-[700px] overflow-hidden bg-[#07080b] flex flex-col justify-between select-none">
      {/* 
        LAYER 1: EMBEDDED GOLDEN GATE & GANESHA OPENING VIDEO
      */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          src="/assets/VideoProject.mp4"
          playsInline
          muted
          preload="auto"
          onEnded={handleVideoEnded}
          className="w-full h-full object-cover object-center"
        >
          <source src="/assets/VideoProject.mp4" type="video/mp4" />
        </video>

        {/* Measured Royal Scrim: Darkens gently once text starts animating */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            step >= 2
              ? "bg-gradient-to-t from-[#07080b]/90 via-[#07080b]/40 to-[#07080b]/75"
              : "bg-gradient-to-b from-[#07080b]/30 via-transparent to-[#07080b]/40"
          }`}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#07080b]/20 to-[#07080b]/80" />
      </div>

      {/* 
        LAYER 2: BEFORE TAP OVERLAY - SILK RIBBON & WAX SEAL ("TAP TO BEGIN")
      */}
      {step === 0 && (
        <div
          onClick={handleOpenGate}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 cursor-pointer animate-fadeIn"
        >
          {/* Silk Ribbon across the doors with Wax Seal and TAP TO BEGIN */}
          <div className="relative w-full max-w-lg flex flex-col items-center justify-center">
            {/* TAP TO BEGIN in White Serif moved upward */}
            <div className="mb-7 sm:mb-9 -translate-y-3 sm:-translate-y-4 animate-pulse">
              <span className="font-royal text-sm sm:text-base tracking-[0.38em] uppercase text-white font-bold drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
                TAP TO BEGIN
              </span>
            </div>

            {/* Silk Ribbon Band spanning horizontally across the gates */}
            <div className="relative w-full h-12 flex items-center justify-center">
              <div className="absolute w-full h-8 sm:h-9 bg-gradient-to-r from-amber-100/80 via-[#fff8eb] to-amber-100/80 shadow-[0_4px_16px_rgba(0,0,0,0.6)] border-y border-amber-300/50" />

              {/* Authentic Royal Red Wax Seal with Two Birds, Heart & Intertwined Rings */}
              <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer filter drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                <img
                  src="/assets/wax_seal_transparent.png"
                  alt="Royal Wedding Wax Seal"
                  className="w-full h-full object-contain filter drop-shadow-md"
                />
              </div>
            </div>

            {/* Silk Ribbon tails hanging down */}
            <div className="flex gap-4 mt-2">
              <div className="w-5 h-16 bg-gradient-to-b from-[#fff8eb] to-amber-100/70 transform -rotate-12 shadow-md clip-ribbon" />
              <div className="w-5 h-16 bg-gradient-to-b from-[#fff8eb] to-amber-100/70 transform rotate-12 shadow-md clip-ribbon" />
            </div>
          </div>
        </div>
      )}

      {/* Elegant floating diya / golden starlight particles */}
      {step >= 2 && (
        <div className="absolute inset-0 pointer-events-none z-[15] overflow-hidden animate-fadeIn">
          {DIYA_PARTICLES.map((diya, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${diya.size} ${diya.bg} blur-[0.5px] shadow-[0_0_8px_rgba(251,191,36,0.25)] animate-diya-float`}
              style={{
                top: diya.top,
                left: diya.left,
                animationDelay: diya.delay,
                animationDuration: diya.duration,
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      )}

      {/* 
        LAYER 3: AFTER VIDEO ENDS OVERLAY
        Mounted during video play (step >= 1) with opacity-0, so transition from translate-y-12 to translate-y-0 executes smoothly
      */}
      {step >= 1 && (
        <div className="relative z-20 flex-1 flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
          {/* Center Couple Typography (reveals slowly one by one AFTER video ends) */}
          <div className="my-auto text-center py-4">
            {/* 1. Groom's Name (Triambak) reveals and floats upward at Step 2 */}
            <h1
              className={`font-script text-4xl sm:text-6xl text-white font-bold tracking-wider drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] transition-all duration-[2200ms] ease-out transform ${
                step >= 2
                  ? "opacity-100 translate-y-0 scale-100 blur-none"
                  : "opacity-0 translate-y-12 scale-95 blur-md"
              }`}
            >
              {groomName}
            </h1>

            {/* 2. "WEDS" reveals at Step 3 */}
            <p
              className={`font-royal text-xs sm:text-sm text-white font-semibold tracking-[0.35em] uppercase my-3 drop-shadow-[0_2px_12px_rgba(212,167,88,0.7)] transition-all duration-[2200ms] ease-out transform ${
                step >= 3
                  ? "opacity-100 translate-y-0 scale-100 blur-none"
                  : "opacity-0 translate-y-6 scale-90 blur-sm"
              }`}
            >
              WEDS
            </p>

            {/* 3. Bride's Name (Trisha) reveals at Step 4 */}
            <h2
              className={`font-script text-4xl sm:text-6xl text-white font-bold tracking-wider drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] transition-all duration-[2400ms] ease-out transform ${
                step >= 4
                  ? "opacity-100 translate-y-0 scale-100 blur-none"
                  : "opacity-0 translate-y-8 scale-95 blur-md"
              }`}
            >
              {brideName}
            </h2>
          </div>

          {/* Bottom SCROLL DOWN Indicator (reveals at Step 5 - when page scroll unlocks) */}
          <div className="pb-8 text-center">
            <button
              onClick={onScrollDown}
              className={`group inline-flex flex-col items-center text-amber-300 hover:text-white transition-all duration-[1600ms] ease-out cursor-pointer pointer-events-auto transform ${
                step >= 5
                  ? "opacity-100 translate-y-0 blur-none"
                  : "opacity-0 translate-y-8 blur-sm pointer-events-none"
              }`}
            >
              <span className="font-royal text-xs uppercase tracking-[0.3em] font-semibold mb-2 group-hover:translate-y-0.5 transition-transform drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                SCROLL DOWN
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-amber-300 via-amber-400 to-transparent animate-pulse" />
              <ArrowDown className="w-4 h-4 text-amber-300 mt-1 animate-bounce" />
            </button>
          </div>
        </div>
      )}

      {/* Top spacer for initial layout balance */}
      <div className="relative z-20" />
    </section>
  );
};
