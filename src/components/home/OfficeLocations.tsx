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
      className="relative w-full bg-[#FDF2F6] text-[#121216] py-16 sm:py-20 lg:py-28 border-b border-[#EB1767]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. SECTION HEADER (Inspired by map style reference: Our Presence)
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
              <Compass className="w-3.5 h-3.5" />
              <span>Commercial Coordination Presence</span>
            </div>

            <h2 
              id="locations-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-tight"
            >
              Karachi &amp; Multan Office Network.
            </h2>

            <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
              United Impex manages client consultations and order coordination through verified offices in Karachi and Multan.
            </p>
          </div>

          <div className="text-left md:text-right">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Direct Inquiries</p>
            <p className="text-base font-extrabold font-['Outfit',sans-serif] text-zinc-900 mt-0.5">
              {CONTACT_INFO.phoneDisplay}
            </p>
          </div>
        </div>

        {/* =========================================================================
            2. TWO VERIFIED OFFICE LOCATION CARDS
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFICE_LOCATIONS.map((office) => {
            const isKarachi = office.city === 'Karachi';
            const mapsQuery = isKarachi
              ? 'Office+1+Near+TDF+Magnifi+Science+Centre+Meher+Sons+Estate+Block+1+Talpur+Road+Karachi'
              : '45+Gulraiz+Colony+Street+3+Near+Allah+Shafi+Chowk+MDA+Road+Multan';
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

            return (
              <div 
                key={office.city}
                className="group bg-white rounded-3xl p-6 sm:p-8 border border-[#EB1767]/20 shadow-xs hover:border-[#EB1767] hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                {/* Header: Office City & Pill */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-[#FDF2F6] text-[#EB1767]">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-zinc-900">
                          {office.city} Office
                        </h3>
                        <p className="text-xs font-semibold text-[#EB1767]">
                          {isKarachi ? 'Southern Commercial Coordination' : 'Punjab Regional Operations'}
                        </p>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600">
                      Verified Location
                    </span>
                  </div>

                  {/* Address */}
                  <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 space-y-2">
                    <div className="flex items-start gap-2.5 text-xs text-zinc-700">
                      <MapPin className="w-4 h-4 text-[#EB1767] shrink-0 mt-0.5" />
                      <p className="leading-relaxed font-medium">
                        {office.address}
                      </p>
                    </div>

                    <p className="text-[11px] text-zinc-500 italic pl-6.5">
                      Scope: {office.note}
                    </p>
                  </div>

                  {/* Office Coordinates & Hours */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-zinc-100 space-y-0.5">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                        Consultation
                      </span>
                      <p className="font-semibold text-zinc-800 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span>By Prior Appointment</span>
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-zinc-100 space-y-0.5">
                      <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">
                        Office Line
                      </span>
                      <a 
                        href={CONTACT_INFO.phoneTel}
                        className="font-semibold text-[#EB1767] hover:underline flex items-center gap-1.5"
                      >
                        <Phone className="w-3 h-3" />
                        <span>{office.phone || CONTACT_INFO.phoneDisplay}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer Action: Verified Google Maps Navigation */}
                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs text-zinc-500">
                    Client visits welcome by prior appointment
                  </span>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3 h-3 text-[#EB1767]" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
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
