import React from 'react';
import { 
  Compass,
  ArrowRight
} from 'lucide-react';
import { Link } from 'wouter';
import { ContactSection } from '../components/home/ContactSection';
import { OfficeLocations } from '../components/home/OfficeLocations';
import { GlassVideoShowcase } from '../components/ui/GlassVideoShowcase';
import contactPosterWebp from '../assets/page-media/contact-media-poster.webp';
import contactPosterPng from '../assets/page-media/contact-media-poster.png';

export const ContactPage: React.FC = () => {
  return (
    <div className="w-full bg-white selection:bg-[#EB1767] selection:text-white pt-6 sm:pt-10 pb-20">
      
      {/* =========================================================================
          1. BREADCRUMB & EDITORIAL HEADER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/" className="hover:text-[#EB1767] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Contact &amp; Offices</span>
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF2F6] border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <Compass className="w-3.5 h-3.5" />
            <span>Direct Commercial Coordination</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-[1.12]">
            Connect With Our Packaging Team.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
            Reach out directly for custom dieline consultations, sample proofing, and volume quotations. Our coordinated offices in Karachi and Multan welcome client consultations by prior appointment.
          </p>
        </div>
      </section>

      {/* =========================================================================
          1B. 16:9 CONSULTATION & PRESS FACILITY MEDIA SHOWCASE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-20">
        <GlassVideoShowcase
          posterWebp={contactPosterWebp}
          posterFallback={contactPosterPng}
          altText="Contact United Impex — Consultation & Industrial Dieline Coordination"
          eyebrow="Commercial Coordination & Sampling"
          title="Direct Commercial Consultation & Quotations"
          subtitle="Submit technical specifications, request material swatch packs, or schedule an in-person press consultation in Karachi or Multan."
          inquiryContext="Contact Desk Video Showcase"
        />
      </section>

      {/* =========================================================================
          2. DIRECT CHANNELS (Using Verified ContactSection Component)
          ========================================================================= */}
      <section className="mb-12">
        <ContactSection />
      </section>

      {/* =========================================================================
          3. VERIFIED KARACHI & MULTAN OFFICES (Using Verified OfficeLocations Component)
          ========================================================================= */}
      <section className="mb-16">
        <OfficeLocations />
      </section>

      {/* =========================================================================
          4. INSTANT QUOTE CTA
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-lg">
          <div className="max-w-xl space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif]">
              Need a Fast B2B Price Estimate?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Configure your paper cups, packaging boxes, paper bags, or diaries in our 4-step wizard with instant WhatsApp quotation handoff.
            </p>
          </div>

          <Link
            href="/quote"
            className="btn-primary text-xs sm:text-sm font-semibold py-3 px-6 whitespace-nowrap"
          >
            <span>Launch Quote Wizard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
