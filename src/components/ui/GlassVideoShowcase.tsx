import React from 'react';
import { Film, Info, ExternalLink } from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { CONTACT_INFO } from '../../data/businessData';

export interface GlassVideoShowcaseProps {
  posterWebp: string;
  posterFallback: string;
  altText: string;
  eyebrow?: string;
  title: string;
  subtitle: string;
  inquiryContext?: string;
}

export const GlassVideoShowcase: React.FC<GlassVideoShowcaseProps> = ({
  posterWebp,
  posterFallback,
  altText,
  eyebrow = 'Commercial Production Showcase',
  title,
  subtitle,
  inquiryContext = 'Commercial Video Preview'
}) => {
  const cleanPhone = CONTACT_INFO.phoneRaw.replace(/\D/g, '');
  return (
    <div className="w-full">
      {/* 16:9 Liquid Glass Outer Frame Container */}
      <div className="relative w-full aspect-16/9 rounded-3xl overflow-hidden bg-zinc-950 border border-[#EB1767]/20 shadow-[0_20px_50px_-15px_rgba(235,23,103,0.18)] group">
        
        {/* 16:9 High-Fidelity Poster Image */}
        <picture>
          <source srcSet={posterWebp} type="image/webp" />
          <img
            src={posterFallback}
            alt={altText}
            width={1672}
            height={941}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
          />
        </picture>

        {/* Ambient Glass Vignette & Subtle Reflection */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/35 pointer-events-none" 
          aria-hidden="true" 
        />

        {/* Top Floating Glass Badge */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-semibold shadow-xs">
            <Film className="w-3.5 h-3.5 text-[#EB1767]" />
            <span>{eyebrow}</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-medium">
            <Info className="w-3.5 h-3.5 text-pink-200" />
            <span>16:9 Visual Presentation</span>
          </div>
        </div>

        {/* Center Polite Preview Indicator (No deceptive fake play button) */}
        <div className="absolute inset-0 flex items-center justify-center p-4 z-10 pointer-events-none">
          <div className="px-5 py-3 rounded-2xl bg-black/65 backdrop-blur-lg border border-white/25 text-white shadow-xl flex items-center gap-3 max-w-md text-center">
            <div className="w-10 h-10 rounded-full bg-[#EB1767]/90 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Film className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-xs sm:text-sm font-bold font-['Outfit',sans-serif] leading-tight text-white">
                Official Production Video
              </p>
              <p className="text-[11px] text-zinc-300">
                Studio case study in post-production • Samples available on request
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Caption Bar with WhatsApp Action */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="max-w-xl text-white space-y-1">
            <h3 className="text-base sm:text-2xl font-bold font-['Outfit',sans-serif] drop-shadow-sm leading-snug">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-200 drop-shadow-xs line-clamp-2">
              {subtitle}
            </p>
          </div>

          <a
            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hello United Impex! I viewed your ${inquiryContext} and would like to request packaging sample specifications.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white text-zinc-900 text-xs font-bold shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-md shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EB1767]"
          >
            <WhatsAppIcon className="w-4 h-4 fill-emerald-600" />
            <span>Inquire About Packaging</span>
            <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

      </div>
    </div>
  );
};

export default GlassVideoShowcase;
