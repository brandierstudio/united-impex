import React, { useState, useEffect } from 'react';
import { Truck } from 'lucide-react';

export interface AnnouncementBarProps {
  className?: string;
}

/**
 * AnnouncementBar Component
 * 
 * Features:
 * - Two-message smooth auto-rotating ticker (~4.5s interval)
 * - Message 1: "Elevate Your Brand with Custom Packaging"
 * - Message 2: "Delivery Options Across Pakistan — Ask for Details" (with Truck icon)
 * - Config flag: freeDeliveryVerified (set to false until client confirms free delivery)
 * - Accessible: Pause on hover/focus, respects prefers-reduced-motion, zero layout shifts
 */
export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ className = '' }) => {
  // Config flag: Free Delivery is NOT verified by client yet.
  // Switch to true ONLY once the owner confirms exact free delivery terms.
  const freeDeliveryVerified = false;

  const messages = [
    {
      id: 'brand',
      content: (
        <span>
          Elevate Your Brand with{' '}
          <span className="text-[#EB1767] font-semibold">Custom Packaging</span> &amp; Printing Solutions
        </span>
      ),
    },
    {
      id: 'delivery',
      content: (
        <span className="inline-flex items-center justify-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-[#EB1767] shrink-0" aria-hidden="true" />
          <span>
            {freeDeliveryVerified ? (
              <>
                <span className="text-[#EB1767] font-semibold">Free Delivery</span> All Over Pakistan
              </>
            ) : (
              <>
                <span className="text-[#EB1767] font-semibold">Delivery Options</span> Across Pakistan — Ask for Details
              </>
            )}
          </span>
        </span>
      ),
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (isPaused || isReducedMotion) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, isReducedMotion, messages.length]);

  return (
    <aside
      aria-label="Announcement Ticker"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={`hidden md:block w-full bg-[#121216] text-white border-b border-zinc-800/40 relative z-30 transition-colors select-none ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2 min-h-[36px] flex items-center justify-center">
        <div 
          className={`text-center text-xs sm:text-[13px] leading-snug font-medium tracking-wide text-zinc-100 ${
            isReducedMotion ? '' : 'animate-announcement-roll'
          }`}
          key={currentIndex}
        >
          {messages[currentIndex].content}
        </div>
      </div>
    </aside>
  );
};

export default AnnouncementBar;
