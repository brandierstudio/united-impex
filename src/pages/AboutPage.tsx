import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Award, 
  Printer, 
  ArrowRight,
  ExternalLink,
  Navigation,
  Compass,
  RotateCw,
  Clock
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { Link } from 'wouter';
import { COMPANY_IDENTITY, CONTACT_INFO, OFFICE_LOCATIONS } from '../data/businessData';
import cardFrontImg from '../assets/about/business-card-front.png';
import cardBackImg from '../assets/about/business-card-back.png';
import areebAshrafImg from '../assets/about/areeb-ashraf.webp';
import { GlassVideoShowcase } from '../components/ui/GlassVideoShowcase';
import aboutPosterWebp from '../assets/page-media/about-media-poster.webp';
import aboutPosterPng from '../assets/page-media/about-media-poster.png';
import { SEOHead } from '../components/seo/SEOHead';

export const AboutPage: React.FC = () => {
  const [activeCardSide, setActiveCardSide] = useState<'front' | 'back'>('front');

  return (
    <div className="w-full bg-white selection:bg-[#EB1767] selection:text-white pt-6 sm:pt-10 pb-20">
      <SEOHead
        title="About Our Printing Heritage & Leadership | United Impex"
        description="Learn about United Impex's commercial printing craftsmanship, our Karachi and Multan facilities, and leadership by CEO Areeb Ashraf."
        canonicalPath="/about"
        schema={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About United Impex",
          "description": "Company background, printing heritage, and executive leadership.",
          "publisher": {
            "@type": "Organization",
            "name": "United Impex",
            "url": "https://united-impex-app.vercel.app/"
          }
        }}
      />
      
      {/* =========================================================================
          1. EDITORIAL PAGE HERO
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/" className="hover:text-[#EB1767] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">About Us</span>
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF2F6] border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-4 shadow-2xs">
            <Compass className="w-3.5 h-3.5" />
            <span>Company Story &amp; Leadership</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-[1.12]">
            Crafting Packaging &amp; Print Standards Since Day One.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
            United Impex operates as a premier quality offset printer, custom packaging manufacturer, and general order supplier. Coordinated from offices in Karachi and Multan, we bring precision engineering and brand consistency to cafes, retailers, and corporate enterprises across Pakistan.
          </p>
        </div>
      </section>

      {/* =========================================================================
          1B. 16:9 BRAND CAPABILITIES VIDEO SHOWCASE (LIQUID GLASS POSTER)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <GlassVideoShowcase
          posterWebp={aboutPosterWebp}
          posterFallback={aboutPosterPng}
          altText="About United Impex — Brand Story & Industrial Packaging Capabilities"
          eyebrow="Company Overview & Press Precision"
          title="About United Impex: Commercial Press Standards"
          subtitle="Explore our integrated manufacturing workflows across folding carton fabrication, hot beverage drinkware, and luxury bound stationery."
          inquiryContext="About Us Brand Story Video Showcase"
        />
      </section>

      {/* =========================================================================
          2. LEADERSHIP SPOTLIGHT & BUSINESS CARD SHOWCASE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT 6 COLS: DIRECTOR PROFILE */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#EB1767] bg-[#FDF2F6] px-3 py-1 rounded-full border border-[#EB1767]/20">
                Executive Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif] text-zinc-900">
                {COMPANY_IDENTITY.leadership.name}
              </h2>
              <p className="text-sm font-semibold text-[#EB1767]">
                {COMPANY_IDENTITY.leadership.role}
              </p>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
              Leading the operational and strategic direction of United Impex, Director Areeb Ashraf focuses on maintaining rigorous material standards, color calibration fidelity, and dependable fulfillment schedules for commercial B2B clients.
            </p>

            {/* Verified Director Credentials */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#EB1767]" />
                  <span>Verified Designation</span>
                </div>
                <p className="text-sm font-semibold text-zinc-800">
                  Director (Not CEO)
                </p>
                <p className="text-xs text-zinc-500">
                  Documented on official visiting card
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                <div className="flex items-center gap-2 text-zinc-900 font-bold text-xs uppercase tracking-wider">
                  <Printer className="w-4 h-4 text-[#EB1767]" />
                  <span>Core Expertise</span>
                </div>
                <p className="text-sm font-semibold text-zinc-800">
                  Offset Print &amp; Packaging
                </p>
                <p className="text-xs text-zinc-500">
                  Dielines, SBS board, custom cartons
                </p>
              </div>
            </div>

            {/* Direct Contact Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={CONTACT_INFO.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-xs font-semibold py-2.5 px-5 flex items-center gap-1.5"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current text-white" />
                <span>Direct WhatsApp Inquiries</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={CONTACT_INFO.phoneTel}
                className="btn-secondary text-xs font-semibold py-2.5 px-5 flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-zinc-600" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* RIGHT 6 COLS: PHOTOGRAPH & INTERACTIVE BUSINESS CARD */}
          <div className="lg:col-span-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              
              {/* Authentic Director Portrait */}
              <div className="sm:col-span-5 relative rounded-3xl overflow-hidden border border-zinc-200/90 shadow-md bg-zinc-100 aspect-3/4 max-w-xs mx-auto sm:max-w-none">
                <img
                  src={areebAshrafImg}
                  alt="Areeb Ashraf, Director of United Impex"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                  <p className="text-xs font-bold font-['Outfit',sans-serif]">Areeb Ashraf</p>
                  <p className="text-[11px] text-pink-200 font-mono">Director</p>
                </div>
              </div>

              {/* Physical Visiting Card Presentation */}
              <div className="sm:col-span-7 bg-zinc-50 rounded-3xl p-5 sm:p-6 border border-zinc-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                    Official Visiting Card
                  </span>
                  
                  {/* Flip Side Toggle */}
                  <div className="inline-flex p-1 rounded-full bg-white border border-zinc-200 shadow-2xs text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setActiveCardSide('front')}
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        activeCardSide === 'front'
                          ? 'bg-zinc-900 text-white'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      Side 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveCardSide('back')}
                      className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        activeCardSide === 'back'
                          ? 'bg-zinc-900 text-white'
                          : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      Side 2
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white p-2">
                  <img
                    src={activeCardSide === 'front' ? cardFrontImg : cardBackImg}
                    alt={`United Impex visiting card ${activeCardSide}`}
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>

                <div className="text-[11px] text-zinc-500 flex items-center justify-between pt-1">
                  <span className="flex items-center gap-1">
                    <RotateCw className="w-3 h-3 text-[#EB1767]" />
                    <span>Verified Company Proof</span>
                  </span>
                  <span className="font-mono text-zinc-400">PDF Reference (1)</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. OUR NATURE OF BUSINESS & CORE CAPABILITIES
          ========================================================================= */}
      <section className="bg-zinc-50 py-16 sm:py-24 border-y border-zinc-200/70 mb-20 sm:mb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EB1767] font-mono">
              Scope of Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif] text-zinc-900 mt-1">
              End-to-End Packaging &amp; Print Fulfillment.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-zinc-600">
              From initial structural dieline consultation to bulk production and logistics delivery across Pakistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDF2F6] text-[#EB1767] flex items-center justify-center">
                <Printer className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-zinc-900">
                Quality Offset Printing
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Precision CMYK and Pantone color reproduction on food-grade boards, art cards, and luxury paper stocks.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDF2F6] text-[#EB1767] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-zinc-900">
                Custom Packaging Boxes
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Rigid setup boxes, folding cartons, and corrugated presentation mailers calibrated to exact customer dimensions.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDF2F6] text-[#EB1767] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-zinc-900">
                General Order Supplier
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Reliable corporate supply contracts for commercial disposables, office stationery, and custom branded merchandise.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-2xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#FDF2F6] text-[#EB1767] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-['Outfit',sans-serif] text-zinc-900">
                Advertising &amp; Branding
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                Bespoke corporate diaries, embossed presentation folders, and retail paper shopping bags with premium handles.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          4. OFFICE PRESENCE NETWORK
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 sm:mb-28">
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#EB1767] font-mono">
            Verified Network
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif] text-zinc-900 mt-1">
            Karachi &amp; Multan Presence.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600">
            Coordinated offices managing client sampling, dieline consultations, and order fulfillment.
          </p>
        </div>

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
                className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200/90 shadow-xs space-y-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#FDF2F6] text-[#EB1767]">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-zinc-900">
                        {office.city} Office
                      </h3>
                      <p className="text-xs font-semibold text-[#EB1767]">
                        {isKarachi ? 'Commercial Coordination Suite' : 'Punjab Regional Desk'}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600">
                    Verified
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/60 space-y-2 text-xs">
                  <div className="flex items-start gap-2.5 text-zinc-700">
                    <MapPin className="w-4 h-4 text-[#EB1767] shrink-0 mt-0.5" />
                    <p className="font-medium leading-relaxed">{office.address}</p>
                  </div>
                  <p className="text-[11px] text-zinc-500 italic pl-6.5">
                    Scope: {office.note}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Visits by prior appointment</span>
                  </span>

                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold transition-colors shadow-2xs"
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
      </section>

      {/* =========================================================================
          5. CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl sm:rounded-[36px] bg-gradient-to-br from-zinc-900 via-zinc-950 to-black text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-5">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#EB1767] bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Ready to Collaborate
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] leading-tight">
              Request Free Digital Dielines &amp; Packaging Quotations.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Connect directly with our commercial team to discuss custom sizes, materials, volume tiered pricing, and sample proofing.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/quote"
                className="px-6 py-3 rounded-full bg-[#EB1767] hover:bg-[#C90E54] text-white text-sm font-semibold transition-all shadow-md flex items-center gap-2"
              >
                <span>Launch Quote Estimator</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-all border border-white/15"
              >
                <span>Browse Products Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
