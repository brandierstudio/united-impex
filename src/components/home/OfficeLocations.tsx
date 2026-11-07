import React from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Phone, 
  Building2, 
  Clock,
  Compass
} from 'lucide-react';
import { OFFICE_LOCATIONS, CONTACT_INFO } from '../../data/businessData';

export const OfficeLocations: React.FC = () => {
  return (
    <section 
      id="locations" 
      aria-labelledby="locations-heading"
      className="relative w-full bg-[#FDF2F6] text-[#121216] py-10 sm:py-14 lg:py-16 border-b border-[#EB1767]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white border border-[#EB1767]/20 text-[#EB1767] text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Compass className="w-3 h-3" />
              <span>Office Network</span>
            </div>

            <h2 
              id="locations-heading"
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight"
            >
              Karachi &amp; Multan Coordination Offices.
            </h2>

            <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 font-['Inter',sans-serif]">
              In-person client consultations &amp; order coordination by prior appointment.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">Commercial Inquiries</p>
            <a 
              href={CONTACT_INFO.phoneTel} 
              className="text-sm sm:text-base font-extrabold font-['Outfit',sans-serif] text-[#EB1767] hover:underline"
            >
              {CONTACT_INFO.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Dual Verified Office Cards with Real City Photo Backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {OFFICE_LOCATIONS.map((office) => {
            const isKarachi = office.city === 'Karachi';
            const cityBg = isKarachi ? '/cities/karachi-skyline.webp' : '/cities/multan-city.webp';
            const photoCredit = isKarachi ? 'Wikimedia Commons (CC0)' : 'Wikimedia Commons (CC BY-SA 4.0)';
            const mapsQuery = isKarachi
              ? 'Office+1+Near+TDF+Magnifi+Science+Centre+Meher+Sons+Estate+Block+1+Talpur+Road+Karachi'
              : '45+Gulraiz+Colony+Street+3+Near+Allah+Shafi+Chowk+MDA+Road+Multan';
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

            return (
              <div 
                key={office.city}
                className="group relative rounded-2xl overflow-hidden border border-zinc-700/60 shadow-md text-white min-h-[300px] sm:min-h-[340px] flex flex-col justify-between p-5 sm:p-6"
              >
                {/* Real City Background Image */}
                <img
                  src={cityBg}
                  alt={`${office.city} city skyline`}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay for High Contrast Legibility */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/45 pointer-events-none"
                  aria-hidden="true" 
                />

                {/* Card Content Top */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md text-[#EB1767] border border-white/10">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold font-['Outfit',sans-serif] text-white">
                          {office.city} Office
                        </h3>
                        <p className="text-[11px] text-[#EB1767] font-semibold">
                          {isKarachi ? 'Southern Coordination' : 'Punjab Operations'}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/10">
                      Verified
                    </span>
                  </div>

                  {/* Verified Address */}
                  <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 space-y-1">
                    <div className="flex items-start gap-2 text-xs text-zinc-200">
                      <MapPin className="w-3.5 h-3.5 text-[#EB1767] shrink-0 mt-0.5" />
                      <p className="leading-relaxed font-medium">
                        {office.address}
                      </p>
                    </div>
                  </div>

                  {/* Hours & Phone in Single Row */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block">
                        Visits
                      </span>
                      <p className="text-[11px] font-medium text-white flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-[#EB1767]" />
                        <span>By Appointment</span>
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider block">
                        Phone
                      </span>
                      <a 
                        href={CONTACT_INFO.phoneTel}
                        className="text-[11px] font-bold text-[#EB1767] hover:underline flex items-center gap-1 mt-0.5"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{office.phone || CONTACT_INFO.phoneDisplay}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Maps Directions + City Attribution Note */}
                <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs mt-3">
                  <span className="text-[10px] text-zinc-400">
                    City view: {photoCredit}
                  </span>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#EB1767] hover:bg-[#C90E54] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3 h-3" />
                    <span>Directions</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default OfficeLocations;
