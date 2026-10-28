import React, { useState, useEffect, useRef } from 'react';
import { ScrollText } from './ScrollReveal';

interface CountdownCardProps {
  targetDate: string;
}

interface RollingDigitProps {
  value: number;
}

const RollingDigit: React.FC<RollingDigitProps> = ({ value }) => {
  const [items, setItems] = useState<Array<{ key: string; val: number; status: 'entering' | 'exiting' | 'idle' }>>([
    { key: `initial-${value}`, val: value, status: 'idle' },
  ]);

  const prevRef = useRef(value);

  useEffect(() => {
    if (value !== prevRef.current) {
      const oldVal = prevRef.current;
      prevRef.current = value;

      setItems([
        { key: `exit-${oldVal}-${Date.now()}`, val: oldVal, status: 'exiting' },
        { key: `enter-${value}-${Date.now()}`, val: value, status: 'entering' },
      ]);

      const timer = setTimeout(() => {
        setItems([{ key: `idle-${value}`, val: value, status: 'idle' }]);
      }, 420);

      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <span className="font-royal text-2xl sm:text-3xl font-bold text-[#b48332] tabular-nums leading-none mb-1 relative h-8 sm:h-9 w-full overflow-hidden flex items-center justify-center select-none">
      {items.map((item) => {
        const text = String(item.val).padStart(2, '0');
        let animStyle: React.CSSProperties = {};

        if (item.status === 'exiting') {
          animStyle = {
            animation: 'digitSlideUpExit 0.42s cubic-bezier(0.2, 0.85, 0.25, 1) forwards',
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform, opacity',
          };
        } else if (item.status === 'entering') {
          animStyle = {
            animation: 'digitSlideUpEnter 0.42s cubic-bezier(0.2, 0.85, 0.25, 1) forwards',
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            willChange: 'transform, opacity',
          };
        } else {
          animStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          };
        }

        return (
          <span key={item.key} style={animStyle}>
            {text}
          </span>
        );
      })}
    </span>
  );
};

export const CountdownCard: React.FC<CountdownCardProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const update = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="w-full max-w-md mx-auto my-12 px-4 text-center">
      {/* Embedded upward animation keyframes */}
      <style>{`
        @keyframes digitSlideUpExit {
          0% {
            transform: translateY(0%);
            opacity: 1;
          }
          100% {
            transform: translateY(-110%);
            opacity: 0;
          }
        }

        @keyframes digitSlideUpEnter {
          0% {
            transform: translateY(110%);
            opacity: 0;
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }
      `}</style>

      <div className="bg-[#fffdf9] rounded-2xl p-7 shadow-xl border border-amber-200/60">
        {/* Title in cursive script matching video */}
        <ScrollText delay={0.05} yOffset={20} blur={8}>
          <h3 className="font-script text-3xl sm:text-4xl text-[#7a1f2d] mb-6">
            The Big Day Approaches
          </h3>
        </ScrollText>

        {/* 4 Countdown Blocks */}
        <ScrollText delay={0.12} yOffset={25} blur={10}>
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HOURS', value: timeLeft.hours },
              { label: 'MINUTES', value: timeLeft.minutes },
              { label: 'SECONDS', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#fcf7ed] border border-amber-300/60 rounded-xl py-3 px-1 shadow-sm flex flex-col items-center justify-center overflow-hidden"
              >
                <RollingDigit value={item.value} />
                <span className="text-[9px] sm:text-[10px] font-royal uppercase tracking-widest text-[#7a6b58] font-semibold">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </ScrollText>
      </div>
    </div>
  );
};
