import React from 'react';
import { COMPANY_IDENTITY } from '../../data/businessData';

export interface AnnouncementBarProps {
  /** Text to display in the announcement bar */
  text?: string;
  /** Substring to highlight in brand accent color */
  highlight?: string;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * AnnouncementBar Component
 * 
 * Sits at the topmost position of the viewport in natural document flow.
 * Scrolls out of view normally (NOT sticky or fixed).
 * 
 * Design Token Bindings:
 * - Background: #121216 (var(--color-announcement-bg))
 * - Primary Text: #FFFFFF / #F4F4F5
 * - Accent Highlight: #EB1767 (var(--color-brand-magenta))
 * - Typography: Inter 12px on mobile / 13px on desktop, font-medium with font-semibold accent
 * - Responsive: Full width, text-balance wrapping on small viewports without horizontal clipping
 */
export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  text = COMPANY_IDENTITY.announcementText,
  highlight = COMPANY_IDENTITY.announcementHighlight,
  className = ''
}) => {
  // Gracefully parse and split string to wrap exact highlight text
  const parts = React.useMemo(() => {
    if (!highlight || !text.includes(highlight)) {
      return [{ text, isHighlight: false }];
    }
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'gi');
    const splitArr = text.split(regex);
    return splitArr.map((segment) => ({
      text: segment,
      isHighlight: segment.toLowerCase() === highlight.toLowerCase()
    }));
  }, [text, highlight]);

  return (
    <aside
      aria-label="Announcement"
      className={`w-full bg-[#121216] text-white border-b border-zinc-800/40 relative z-30 transition-colors ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-2">
        <p className="text-center text-xs sm:text-[13px] leading-snug sm:leading-normal font-medium tracking-wide text-zinc-100 text-balance selection:bg-[#EB1767] selection:text-white">
          {parts.map((part, index) => 
            part.isHighlight ? (
              <span
                key={index}
                className="text-[#EB1767] font-semibold tracking-normal"
              >
                {part.text}
              </span>
            ) : (
              <span key={index}>{part.text}</span>
            )
          )}
        </p>
      </div>
    </aside>
  );
};

export default AnnouncementBar;
