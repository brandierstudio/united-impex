import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Clock, 
  Phone
} from 'lucide-react';
import { WhatsAppIcon } from '../components/icons/WhatsAppIcon';
import { Link } from 'wouter';
import { QuotationWizard } from '../components/home/QuotationWizard';
import { CONTACT_INFO } from '../data/businessData';
import type { CustomizerCategory } from '../components/customizer/ProductCustomizerModal';

export const QuotePage: React.FC = () => {
  // Support pre-selecting category via query string (?product=cups|boxes|bags|diaries)
  const queryParam = typeof window !== 'undefined'
    ? new URLSearchParams(window.location.search).get('product')
    : null;

  const initialCat: CustomizerCategory = 
    queryParam === 'boxes' || queryParam === 'bags' || queryParam === 'diaries' || queryParam === 'cups'
      ? queryParam
      : 'cups';

  return (
    <div className="w-full bg-white selection:bg-[#EB1767] selection:text-white pt-6 sm:pt-10 pb-20">
      
      {/* =========================================================================
          1. HEADER & VALUE PROPOSITION
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-14">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-zinc-500">
          <Link href="/" className="hover:text-[#EB1767] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-zinc-900 font-semibold">Request a Quote</span>
        </nav>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FDF2F6] border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <FileText className="w-3.5 h-3.5" />
            <span>Interactive B2B Pricing Estimator</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-[1.12]">
            Calculate Your Custom Packaging Quote.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
            Select your product category, configure order quantity, board substrates, and finishing treatments. Our wizard generates instant volume tiered estimates with one-click WhatsApp prefilled inquiry handoff.
          </p>
        </div>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-zinc-100 text-xs">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/70">
            <ShieldCheck className="w-5 h-5 text-[#EB1767] shrink-0" />
            <div>
              <p className="font-bold text-zinc-900">Free Digital Proofs</p>
              <p className="text-zinc-500 text-[11px]">1:1 dieline check before printing</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/70">
            <Clock className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-zinc-900">Fast 5–7 Day Turnaround</p>
              <p className="text-zinc-500 text-[11px]">Dependable commercial scheduling</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200/70">
            <WhatsAppIcon className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-zinc-900">Direct WhatsApp Assistance</p>
              <p className="text-zinc-500 text-[11px]">Speak with our pre-press team</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. THE COMPLETE INTERACTIVE QUOTATION WIZARD
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <QuotationWizard initialCategory={initialCat} />
      </section>

      {/* =========================================================================
          3. DIRECT ASSISTANCE CALLOUT
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-50 border border-zinc-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold font-['Outfit',sans-serif] text-zinc-900">
              Prefer to discuss complex dielines over phone or email?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600">
              Our Karachi and Multan commercial desks are ready to assist with custom paperboard weights, bespoke box dies, and large institutional tenders.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={CONTACT_INFO.phoneTel}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 text-xs font-semibold shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#EB1767]" />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>

            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors"
            >
              View Office Locations &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default QuotePage;
