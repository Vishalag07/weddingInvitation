import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { weddingAudio } from '../utils/audioPlayer';

export const VinylPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsub = weddingAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsub;
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    weddingAudio.toggle();
  };

  return (
    <aside
      aria-label="Wedding audio player"
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] sm:bottom-6 sm:right-6 z-50 pointer-events-auto"
    >
      <button
        type="button"
        onClick={handleToggle}
        title={isPlaying ? 'Pause "RAMO RE"' : 'Play "RAMO RE" (Jigardan Gadhavi & Kavya Limaye)'}
        className="group relative flex items-center justify-center cursor-pointer touch-none transition-transform hover:scale-105 active:scale-95 focus:outline-none select-none"
        aria-label="Toggle wedding song"
      >
        {/* Stationary Outer Base & Shadow (Does NOT rotate - completely prevents shadow flicker) */}
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#111111] shadow-[0_6px_22px_rgba(0,0,0,0.65)] border-2 border-stone-800/90 overflow-hidden flex items-center justify-center">
          
          {/* Smooth GPU-Accelerated Rotating Vinyl Disc */}
          <div
            className={`w-full h-full rounded-full flex items-center justify-center transition-opacity duration-300 ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{
              animationDuration: '4s',
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            {/* Vinyl Grooves concentric rings */}
            <div className="absolute inset-1 rounded-full border border-stone-700/40 pointer-events-none" />
            <div className="absolute inset-2.5 rounded-full border border-stone-700/30 pointer-events-none" />
            <div className="absolute inset-4 rounded-full border border-stone-700/20 pointer-events-none" />

            {/* Center Golden Label */}
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#991b1b] via-[#c59d5f] to-[#e6ca85] flex items-center justify-center border border-amber-200/60 shadow-inner">
              {/* Center Spindle Hole */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#111111] border border-amber-900" />
            </div>
          </div>
        </div>

        {/* Small Audio Indicator Badge (Stationary) */}
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center shadow-md pointer-events-none">
          {isPlaying ? (
            <Volume2 className="w-3 h-3 text-stone-950" />
          ) : (
            <VolumeX className="w-3 h-3 text-stone-900" />
          )}
        </div>
      </button>
    </aside>
  );
};
