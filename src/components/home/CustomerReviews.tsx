import React from 'react';
import { 
  Star, 
  MessageSquareQuote, 
  Info, 
  MapPin 
} from 'lucide-react';
import { 
  DEMO_CUSTOMER_REVIEWS, 
  SOCIAL_PROOF_DISCLOSURE, 
  type CustomerReview 
} from '../../data/socialProofData';

export const CustomerReviews: React.FC = () => {
  return (
    <section 
      id="reviews" 
      aria-labelledby="reviews-heading"
      className="relative w-full bg-[#121216] text-white py-16 sm:py-20 lg:py-28 border-b border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. SECTION HEADER WITH MANDATORY DEMO DISCLOSURE
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EB1767]/15 border border-[#EB1767]/30 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#EB1767]" />
              <span>Customer Feedback</span>
            </div>

            <h2 
              id="reviews-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight leading-tight"
            >
              Trusted for Precision Packaging &amp; Print.
            </h2>

            <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">
              Explore how cafes, retail boutiques, and corporate teams partner with United Impex for consistent color reproduction, reliable dielines, and quality materials.
            </p>
          </div>

          {/* Mandatory Demo Content Disclosure Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-950/40 border border-amber-800/60 text-amber-300 text-xs font-medium shrink-0 self-start md:self-auto shadow-2xs">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{SOCIAL_PROOF_DISCLOSURE.shortNotice}</span>
          </div>
        </div>

        {/* =========================================================================
            2. REVIEWS 4-COLUMN RESPONSIVE CARD GRID
            (Mobile: Smooth touch swipe snap-carousel; Desktop: 4-column grid)
            ========================================================================= */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {DEMO_CUSTOMER_REVIEWS.map((rev: CustomerReview) => (
            <div 
              key={rev.id}
              className="group bg-zinc-900/90 rounded-2xl p-6 border border-zinc-800 shadow-md hover:border-[#EB1767]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 w-[82vw] max-w-[320px] shrink-0 snap-center md:w-full"
            >
              {/* Card Header: Stars & Product Badge */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-amber-400" aria-label={`Rating: ${rev.rating} out of 5 stars`}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-semibold uppercase">
                    Demo
                  </span>
                </div>

                <div className="inline-block px-2.5 py-1 rounded-md bg-[#EB1767]/15 text-[#EB1767] text-[11px] font-semibold">
                  {rev.productTag}
                </div>

                <h3 className="text-base font-bold font-['Outfit',sans-serif] text-white group-hover:text-[#EB1767] transition-colors leading-snug">
                  "{rev.reviewTitle}"
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  {rev.reviewText}
                </p>
              </div>

              {/* Card Footer: Author Identity */}
              <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-200 shrink-0 font-['Outfit',sans-serif]">
                  {rev.authorName.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-white truncate">
                    {rev.authorName}
                  </p>
                  <p className="text-[11px] text-zinc-400 truncate">
                    {rev.authorRole} &bull; {rev.businessType}
                  </p>
                  <p className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{rev.location}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <p className="md:hidden text-center text-xs text-zinc-400 mt-3 font-medium">
          &larr; Swipe horizontally to read all client reviews &rarr;
        </p>

        {/* Subtle Bottom Disclosure */}
        <p className="mt-8 text-center text-xs text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          {SOCIAL_PROOF_DISCLOSURE.fullDisclaimer}
        </p>
      </div>
    </section>
  );
};

export default CustomerReviews;
