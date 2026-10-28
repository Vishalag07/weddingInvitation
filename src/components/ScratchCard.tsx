import React, { useRef, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import { CinematicReveal } from "./CinematicReveal";
import { Pointer } from "lucide-react";

interface ScratchCardProps {
  weddingDateDisplay?: string;
  day?: string;
  month?: string;
  year?: string;
}

// Elegant romantic heart path in 320x290 coordinate space
const HEART_PATH_D =
  "M 160 55 C 143 22, 105 18, 75 35 C 35 58, 30 100, 48 135 C 70 178, 120 230, 160 270 C 200 230, 250 178, 272 135 C 290 100, 285 58, 245 35 C 215 18, 177 22, 160 55 Z";

export const ScratchCard: React.FC<ScratchCardProps> = ({
  weddingDateDisplay,
  day,
  month,
  year,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(
    null,
  );

  const isRevealedRef = useRef(false);
  const isScratchingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Date values matching the video recording
  const displayDay = day || (weddingDateDisplay?.includes("11") ? "11" : "11");
  const displayMonth = month || "FEBRUARY";
  const displayYear = year || "2027";

  // Draw the smooth gold satin foil on canvas

  const drawGoldHeartFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = 320;
    const height = 290;

    // Keep a consistent internal coordinate system.
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const heart = new Path2D(HEART_PATH_D);

    // Clip all foil rendering to the exact heart silhouette.
    ctx.save();
    ctx.clip(heart);

    const grad = ctx.createLinearGradient(30, 20, width - 30, height - 20);
    grad.addColorStop(0, "#fceda8");
    grad.addColorStop(0.25, "#e0b852");
    grad.addColorStop(0.5, "#fff1ba");
    grad.addColorStop(0.75, "#cba043");
    grad.addColorStop(1, "#e3be5b");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    const sheen = ctx.createLinearGradient(0, 0, width, height);
    sheen.addColorStop(0.35, "rgba(255,255,255,0)");
    sheen.addColorStop(0.5, "rgba(255,255,255,0.35)");
    sheen.addColorStop(0.65, "rgba(255,255,255,0)");

    ctx.fillStyle = sheen;
    ctx.fillRect(0, 0, width, height);

    ctx.restore();

    // Draw the border separately so it stays visible.
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#fef0b8";
    ctx.stroke(heart);
    ctx.restore();
  }, []);

  useEffect(() => {
    drawGoldHeartFoil();
  }, [drawGoldHeartFoil]);

  const triggerReveal = () => {
    if (isRevealedRef.current) return;
    isRevealedRef.current = true;
    setIsRevealed(true);
    setCursorPos(null);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    try {
      confetti({
        particleCount: 75,
        spread: 85,
        origin: { y: 0.55 },
        colors: ["#e7c87c", "#f59e0b", "#d97706", "#fffbeb", "#ffd700"],
        ticks: 220,
      });
    } catch {
      // ignore
    }
  };

  const scratchTo = (clientX: number, clientY: number) => {
    if (isRevealedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    // Track cursor pos relative to container for the gray indicator dot
    const container = containerRef.current;
    if (container) {
      const cRect = container.getBoundingClientRect();
      setCursorPos({
        x: clientX - cRect.left,
        y: clientY - cRect.top,
      });
    }

    ctx.save();
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 42;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPointRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, 21, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    lastPointRef.current = { x, y };

    // Calculate transparency percentage
    try {
      const imgData = ctx.getImageData(40, 40, 240, 210).data;
      let transparentCount = 0;
      const step = 20;
      for (let i = 3; i < imgData.length; i += step * 4) {
        if (imgData[i] === 0) transparentCount++;
      }
      const totalSampled = imgData.length / (step * 4);
      if (transparentCount / totalSampled > 0.35) {
        triggerReveal();
      }
    } catch {
      // fallback
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isScratchingRef.current = true;
    setIsScratching(true);
    lastPointRef.current = null;
    scratchTo(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return;
    scratchTo(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isScratchingRef.current = false;
    setIsScratching(false);
    lastPointRef.current = null;
    setCursorPos(null);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isScratchingRef.current = true;
    setIsScratching(true);
    lastPointRef.current = null;
    if (e.touches[0]) {
      scratchTo(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratchingRef.current) return;
    if (e.touches[0]) {
      scratchTo(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    isScratchingRef.current = false;
    setIsScratching(false);
    lastPointRef.current = null;
    setCursorPos(null);
  };

  const handleReset = () => {
    isRevealedRef.current = false;
    setIsRevealed(false);
    drawGoldHeartFoil();
  };

  return (
    <CinematicReveal
      as="div"
      className="w-full max-w-md mx-auto my-14 px-4 text-center relative select-none"
      delay={0}
    >
      {/* SVG Clip Path Definition for exact heart silhouette */}
      <svg
        className="absolute w-px h-px pointer-events-none"
        style={{ left: 0, top: 0 }}
        aria-hidden="true"
      >
        <defs>
          <clipPath id="scratchHeartClip" clipPathUnits="userSpaceOnUse">
            <path d={HEART_PATH_D} />
          </clipPath>
        </defs>
      </svg>
      <div className="bg-[#fffdf9] rounded-3xl p-4 sm:p-8 shadow-xl border border-amber-200/50 relative overflow-hidden flex flex-col items-center justify-between min-h-[500px] sm:min-h-[540px] text-center w-full">
        {/* Subtle scattered golden shimmer particles matching video */}
        <span className="absolute top-8 left-6 text-amber-400/50 text-xs animate-pulse">
          ✦
        </span>
        <span className="absolute top-20 right-8 text-amber-300/40 text-[10px]">
          ✦
        </span>
        <span className="absolute bottom-24 left-8 text-amber-400/40 text-[10px]">
          ✦
        </span>
        <span className="absolute bottom-10 right-10 text-amber-400/50 text-xs animate-pulse">
          ✦
        </span>
        <span className="absolute top-1/2 left-3 w-1.5 h-1.5 rounded-full bg-amber-300/30 blur-xs" />
        <span className="absolute top-1/3 right-4 w-2 h-2 rounded-full bg-yellow-400/25 blur-xs" />

        {/* Top Tagline & Title */}
        <CinematicReveal delay={120} as="div" className="w-full pt-1">
          <p className="font-royal text-[11px] uppercase tracking-[0.35em] text-[#c59d5f] font-semibold mb-2">
            A Special Surprise
          </p>
          <h3 className="font-royal text-base sm:text-lg font-medium text-[#2d251d] tracking-wider uppercase leading-snug max-w-xs mx-auto">
            Scratch The Heart To
            <br />
            Reveal Our Wedding Date
          </h3>
        </CinematicReveal>

        {/* 
          HEART SCRATCH CONTAINER - Perfectly Centered in Div
        */}
        <CinematicReveal
          delay={240}
          as="div"
          className="w-full flex items-center justify-center my-auto py-2"
        >
          <div
            ref={containerRef}
            className="relative w-full max-w-[300px] sm:max-w-[320px] aspect-[320/290] mx-auto flex items-center justify-center select-none shrink-0"
          >
            {/* UNDERNEATH LAYER: Revealed Date inside pure ivory Heart with Gold Border */}
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center">
              {/* Heart Golden Contour Border matching video */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 320 290"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d={HEART_PATH_D}
                  stroke="#d4af37"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Revealed Date Content: 11 / FEBRUARY / 2027 (Optically Centered) */}
              <div className="relative z-10 text-center flex flex-col items-center justify-center -translate-y-2">
                <span className="font-royal text-5xl sm:text-6xl font-normal text-[#b48332] leading-none mb-1.5 tracking-tight">
                  {displayDay}
                </span>
                <span className="font-royal text-lg sm:text-xl font-medium tracking-[0.25em] text-[#b48332] uppercase mb-1.5">
                  {displayMonth}
                </span>
                <span className="font-royal text-2xl sm:text-3xl font-normal text-[#b48332] tracking-wider">
                  {displayYear}
                </span>
              </div>
            </div>

            {/* FOREGROUND LAYER: Scratchable Gold Satin Canvas */}

            <canvas
              ref={canvasRef}
              width={320}
              height={290}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`absolute inset-0 w-full h-full z-20 cursor-pointer touch-none transition-opacity duration-700 ${
                isRevealed ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
            />
          </div>
        </CinematicReveal>

        {/* Scratch instruction matching the reference image */}
        <CinematicReveal delay={120} as="div" className="w-full pt-3 pb-2">
          <div className="relative flex flex-col items-center justify-center min-h-[100px]">
            <h3 className="font-royal text-base sm:text-lg uppercase tracking-[0.28em] text-[#a84c55] font-normal text-center">
              {isRevealed ? "DATE REVEALED!" : "SCRATCH TO REVEAL!"}
              <span className="inline-block ml-2 tracking-normal">✨</span>
            </h3>

            {/* Hand pointer indicating scratch direction */}
            {!isRevealed ? (
              <div className="mt-3 text-[#dcb43d] animate-bounce flex items-center justify-center">
                <Pointer className="w-11 h-11 stroke-[1.8] drop-shadow-sm" />
              </div>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 text-xs uppercase tracking-widest text-[#b48332] hover:text-[#8c6220] transition-colors border-b border-[#b48332]/40 pb-0.5 cursor-pointer font-royal"
              >
                Scratch Again ↺
              </button>
            )}
          </div>
        </CinematicReveal>
      </div>
    </CinematicReveal>
  );
};
