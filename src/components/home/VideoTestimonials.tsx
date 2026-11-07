import React, { useState } from 'react';
import { 
  Play, 
  Film, 
  Info, 
  Clock, 
  Tag
} from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { 
  DEMO_VIDEO_TESTIMONIALS, 
  type VideoTestimonial 
} from '../../data/socialProofData';

// Vertical 9:16 poster assets
import posterCupsWebp from '../../assets/testimonials/poster-video-cups.webp';
import posterCupsJpg from '../../assets/testimonials/poster-video-cups.jpg';
import posterBoxesWebp from '../../assets/testimonials/poster-video-boxes.webp';
import posterBoxesJpg from '../../assets/testimonials/poster-video-boxes.jpg';
import posterBagsWebp from '../../assets/testimonials/poster-video-bags.webp';
import posterBagsJpg from '../../assets/testimonials/poster-video-bags.jpg';

interface VideoTestimonialsProps {
  onOpenCustomizer?: () => void;
}

export const VideoTestimonials: React.FC<VideoTestimonialsProps> = ({ onOpenCustomizer }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);

  const getPosterSrc = (posterId: string) => {
    switch (posterId) {
      case 'cups':
        return { webp: posterCupsWebp, jpg: posterCupsJpg };
      case 'boxes':
        return { webp: posterBoxesWebp, jpg: posterBoxesJpg };
      case 'bags':
        return { webp: posterBagsWebp, jpg: posterBagsJpg };
      default:
        return { webp: posterCupsWebp, jpg: posterCupsJpg };
    }
  };

  return (
    <section 
      id="video-testimonials" 
      aria-labelledby="video-heading"
      className="relative w-full bg-[#FDF2F6] text-[#121216] py-10 sm:py-14 lg:py-16 border-b border-[#EB1767]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. SECTION HEADER
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
              <Film className="w-3.5 h-3.5 text-[#EB1767]" />
              <span>Video Spotlights</span>
            </div>

            <h2 
              id="video-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-tight"
            >
              Packaging in Action: Client Spotlights.
            </h2>

            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed">
              Watch real-world packaging unboxings, custom print registration reviews, and material tactile demonstrations across our primary product categories.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-medium shrink-0 self-start md:self-auto shadow-2xs">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Demo previews &bull; Production videos coming soon</span>
          </div>
        </div>

        {/* =========================================================================
            2. THREE 9:16 VERTICAL VIDEO TESTIMONIAL CARDS
            (Mobile: Smooth touch swipe snap-carousel; Desktop: 3-column grid)
            ========================================================================= */}
        <div className="flex md:grid md:grid-cols-3 gap-5 lg:gap-8 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {DEMO_VIDEO_TESTIMONIALS.map((vid: VideoTestimonial) => {
            const poster = getPosterSrc(vid.posterId);
            return (
              <div 
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className="group relative aspect-9/16 w-[78vw] max-w-[280px] shrink-0 snap-center md:w-full rounded-3xl overflow-hidden bg-zinc-900 border border-[#EB1767]/20 shadow-md hover:shadow-2xl hover:border-[#EB1767]/60 transition-all duration-300 cursor-pointer select-none"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedVideo(vid);
                  }
                }}
                aria-label={`Open preview modal for ${vid.title}`}
              >
                {/* 9:16 High-Resolution Poster Image */}
                <picture>
                  <source srcSet={poster.webp} type="image/webp" />
                  <img 
                    src={poster.jpg} 
                    alt={vid.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                    loading="lazy"
                    width={720}
                    height={1280}
                  />
                </picture>

                {/* Cinematic Glass Overlay Gradient */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 group-hover:from-black/90 group-hover:via-black/40 transition-colors duration-300" 
                  aria-hidden="true" 
                />

                {/* Top Header Tags */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 shadow-xs">
                    <Tag className="w-3 h-3 text-[#EB1767]" />
                    <span className="capitalize">{vid.category} Packaging</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-mono border border-white/20">
                    <Clock className="w-3 h-3" />
                    <span>{vid.durationBadge}</span>
                  </span>
                </div>

                {/* Central Play Indicator */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/25 group-hover:bg-[#EB1767] backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-all duration-300">
                    <Play className="w-6 h-6 fill-white ml-1 text-white" />
                  </div>
                </div>

                {/* Bottom Content Pill & Speaker Details */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white z-10 space-y-2">
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[10px] font-semibold tracking-wide uppercase backdrop-blur-xs">
                    {vid.previewNote}
                  </div>

                  <h3 className="font-['Outfit',sans-serif] text-base sm:text-lg font-bold leading-tight text-white group-hover:text-pink-200 transition-colors">
                    {vid.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-snug line-clamp-2">
                    {vid.subtitle}
                  </p>

                  <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-zinc-300">
                    <span className="font-semibold text-white truncate">{vid.speakerName}</span>
                    <span className="text-zinc-400 shrink-0">{vid.businessType}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Hint */}
        <p className="md:hidden text-center text-xs text-zinc-400 mt-3 font-medium">
          &larr; Swipe horizontally to explore client spotlights &rarr;
        </p>

        {/* =========================================================================
            3. INTERACTIVE PREVIEW MODAL (POLITE DEMO FEEDBACK)
            ========================================================================= */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
          >
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <div className="flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#EB1767]" />
                  <h3 id="video-modal-title" className="text-lg font-bold font-['Outfit',sans-serif] text-zinc-900">
                    {selectedVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-zinc-400 hover:text-zinc-600 text-sm font-bold p-1 rounded-md"
                  aria-label="Close dialog"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-600 leading-relaxed">
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Video Testimonial Demo Mode</strong>
                    Official client video case studies are currently in post-production. To inspect physical samples of our {selectedVideo.category} packaging or arrange a tailored press consultation, connect directly with our office.
                  </div>
                </div>

                <p>
                  <strong>Category:</strong> {selectedVideo.category.toUpperCase()} &bull; <strong>Duration:</strong> {selectedVideo.durationBadge}
                </p>
                <p>
                  <strong>Featured Client:</strong> {selectedVideo.speakerName} ({selectedVideo.businessType})
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="btn-secondary w-full sm:w-auto text-xs py-2.5 px-4"
                >
                  Close Preview
                </button>
                {onOpenCustomizer && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVideo(null);
                      onOpenCustomizer();
                    }}
                    className="btn-dark w-full sm:w-auto text-xs py-2.5 px-4"
                  >
                    Open 2D Customizer
                  </button>
                )}
                <a
                  href={`https://wa.me/923714799755?text=${encodeURIComponent(`Hello United Impex! I watched your ${selectedVideo.title} video spotlight and would like to inquire about similar packaging.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full sm:w-auto text-xs py-2.5 px-4 inline-flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default VideoTestimonials;
