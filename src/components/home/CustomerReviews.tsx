import React from 'react';
import { 
  Star, 
  MessageSquareQuote, 
  Info
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
      className="relative w-full bg-[#121216] text-white py-10 sm:py-14 lg:py-16 border-b border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header with Sample Disclaimer */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#EB1767]/15 border border-[#EB1767]/30 text-[#EB1767] text-[11px] font-semibold uppercase tracking-wider mb-2">
              <MessageSquareQuote className="w-3 h-3 text-[#EB1767]" />
              <span>Customer Feedback</span>
            </div>

            <h2 
              id="reviews-heading"
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight"
            >
              Trusted for Packaging &amp; Print.
            </h2>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 text-zinc-300 text-[11px] font-medium self-start sm:self-auto">
            <Info className="w-3.5 h-3.5 text-[#EB1767] shrink-0" />
            <span>{SOCIAL_PROOF_DISCLOSURE.shortNotice}</span>
          </div>
        </div>

        {/* Compact Review Cards: Mobile 1.1-card carousel, Desktop 4-col grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {DEMO_CUSTOMER_REVIEWS.map((rev: CustomerReview) => (
            <article 
              key={rev.id}
              className="group bg-zinc-900/85 rounded-xl p-4 sm:p-5 border border-zinc-800 hover:border-zinc-700 shadow-sm transition-all duration-300 flex flex-col justify-between space-y-3 w-[78vw] max-w-[280px] shrink-0 snap-center md:w-full"
            >
              {/* Rating & Demo Chip */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5 text-amber-400" aria-label={`Rating: ${rev.rating} out of 5 stars`}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-semibold uppercase">
                    Sample
                  </span>
                </div>

                <span className="inline-block text-[10px] font-semibold text-[#EB1767] bg-[#EB1767]/10 px-2 py-0.5 rounded">
                  {rev.productTag}
                </span>

                <h3 className="text-xs sm:text-sm font-bold font-['Outfit',sans-serif] text-white leading-snug line-clamp-1">
                  "{rev.reviewTitle}"
                </h3>

                <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed line-clamp-3">
                  {rev.reviewText}
                </p>
              </div>

              {/* Author Identity with Verified Portrait Photo */}
              <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2.5">
                {rev.avatarUrl ? (
                  <img
                    src={rev.avatarUrl}
                    alt={`${rev.authorName} sample avatar`}
                    className="w-8 h-8 rounded-full object-cover border border-zinc-700 shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-200 shrink-0">
                    {rev.authorName.split(' ').map(n => n[0]).join('')}
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-bold text-white truncate">
                    {rev.authorName}
                  </p>
                  <p className="text-[10px] text-zinc-400 truncate">
                    {rev.authorRole} &bull; {rev.businessType}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReviews;
