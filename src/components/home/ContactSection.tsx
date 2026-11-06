import React from 'react';
import { 
  Phone, 
  Mail, 
  UserCheck, 
  ArrowRight 
} from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { CONTACT_INFO } from '../../data/businessData';

export const ContactSection: React.FC = () => {
  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading"
      className="relative w-full bg-[#121216] text-white py-16 sm:py-20 lg:py-28 border-b border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. SECTION HEADER
            ========================================================================= */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EB1767]/15 border border-[#EB1767]/30 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB1767]" aria-hidden="true" />
            <span>Direct Client Coordination</span>
          </div>

          <h2 
            id="contact-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight leading-tight"
          >
            Start Your Packaging Inquiry.
          </h2>

          <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed font-['Inter',sans-serif]">
            Connect directly with our leadership and commercial coordination desks for custom product sampling, dieline consultations, and itemized quotations.
          </p>
        </div>

        {/* =========================================================================
            2. THREE DIRECT CONTACT CHANNELS
            ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          
          {/* Card 1: WhatsApp Coordination Desk */}
          <a
            href={CONTACT_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-md hover:border-[#EB1767] hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <WhatsAppIcon className="w-6 h-6 fill-white" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#EB1767] font-mono">
                  Instant Response
                </span>
                <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white mt-0.5 group-hover:text-[#EB1767] transition-colors">
                  WhatsApp Support
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed font-['Inter',sans-serif]">
                  Fastest way to share logos, request dieline templates, and review active order production stages.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                {CONTACT_INFO.whatsappNumber}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#EB1767] group-hover:translate-x-0.5 transition-transform">
                <span>Chat Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* Card 2: Phone Helpline */}
          <a
            href={CONTACT_INFO.phoneTel}
            className="group p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-md hover:border-[#EB1767]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Phone className="w-6 h-6 text-[#EB1767]" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  Direct Line
                </span>
                <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white mt-0.5 group-hover:text-[#EB1767] transition-colors">
                  Telephone Consultation
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
                  Speak directly with our team regarding technical dieline specs, paperboard choices, and volume pricing.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white">
                {CONTACT_INFO.phoneDisplay}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-300 group-hover:text-[#EB1767] group-hover:translate-x-0.5 transition-transform">
                <span>Tap to Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* Card 3: Email Inquiries */}
          <a
            href={CONTACT_INFO.emailMailto}
            className="group p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-md hover:border-[#EB1767]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6 text-[#EB1767]" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                  Formal RFP &amp; RFQ
                </span>
                <h3 className="text-xl font-bold font-['Outfit',sans-serif] text-white mt-0.5 group-hover:text-[#EB1767] transition-colors">
                  Email Desk
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 mt-1.5 leading-relaxed">
                  Submit formal enterprise procurement requests, corporate tender documents, and bulk specifications.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <span className="text-xs font-bold text-white truncate max-w-[180px]">
                {CONTACT_INFO.email}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-300 group-hover:text-[#EB1767] group-hover:translate-x-0.5 transition-transform">
                <span>Send Email</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        </div>

        {/* =========================================================================
            3. LEADERSHIP & VERIFIED DESK STRIP
            ========================================================================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0">
              <UserCheck className="w-6 h-6 text-[#EB1767]" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#EB1767]">
                Executive Leadership
              </p>
              <h4 className="text-lg font-bold font-['Outfit',sans-serif]">
                Areeb Ashraf — Director
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Overseeing United Impex commercial printing operations and client relations across Pakistan.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#quote-wizard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-zinc-900 hover:bg-zinc-100 text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              <span>Use Quotation Wizard</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EB1767]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
