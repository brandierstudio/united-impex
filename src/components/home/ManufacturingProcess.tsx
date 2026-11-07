import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  Palette, 
  FileCheck, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import { 
  PROCESS_STAGES, 
  type ProcessStage 
} from '../../data/processData';
import { Link } from 'wouter';

import heroPressWebp from '../../assets/process/process-hero-press.webp';
import heroPressJpg from '../../assets/process/process-hero-press.jpg';
import stage1Webp from '../../assets/process/process-stage-1-requirements.webp';
import stage1Jpg from '../../assets/process/process-stage-1-requirements.jpg';
import stage2Webp from '../../assets/process/process-stage-2-options.webp';
import stage2Jpg from '../../assets/process/process-stage-2-options.jpg';
import stage3Webp from '../../assets/process/process-stage-3-specs.webp';
import stage3Jpg from '../../assets/process/process-stage-3-specs.jpg';

interface ManufacturingProcessProps {
  onOpenCustomizer?: () => void;
}

export const ManufacturingProcess: React.FC<ManufacturingProcessProps> = ({ onOpenCustomizer }) => {
  const getImageSource = (imageId: string) => {
    switch (imageId) {
      case 'stage-requirements':
        return { webp: stage1Webp, jpg: stage1Jpg };
      case 'stage-options':
        return { webp: stage2Webp, jpg: stage2Jpg };
      case 'stage-specs':
        return { webp: stage3Webp, jpg: stage3Jpg };
      default:
        return { webp: heroPressWebp, jpg: heroPressJpg };
    }
  };

  const getStageIcon = (step: string) => {
    switch (step) {
      case '01':
        return <Layers className="w-3.5 h-3.5 text-[#EB1767]" />;
      case '02':
        return <Palette className="w-3.5 h-3.5 text-[#EB1767]" />;
      case '03':
        return <FileCheck className="w-3.5 h-3.5 text-[#EB1767]" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#EB1767]" />;
    }
  };

  return (
    <section 
      id="how-we-work" 
      aria-labelledby="process-heading"
      className="relative w-full bg-[#121216] text-white py-10 sm:py-14 lg:py-16 border-b border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Header */}
        <div className="max-w-2xl mb-8 sm:mb-10">
          <div className="reveal-subheading inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 border border-white/20 text-[#EB1767] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB1767]" aria-hidden="true" />
            <span>Workflow &amp; Production</span>
          </div>

          <h2 
            id="process-heading"
            className="reveal-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight"
          >
            Commercial Printing &amp; Production Workflow.
          </h2>

          <p className="reveal-subheading mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-['Inter',sans-serif]">
            A structured three-phase manufacturing process engineered for brand consistency across nationwide orders.
          </p>
        </div>

        {/* 12-Column Grid: Left 4 cols for Cup Anchor 3, Right 8 cols for 3-Step Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* CUP ANCHOR 3: LEFT SIDEWAY POINT */}
          <div 
            id="cup-anchor-3"
            className="lg:col-span-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 p-5 sm:p-6 flex flex-col justify-between shadow-md min-h-[220px] lg:min-h-[360px]"
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#EB1767] block mb-1">
                Order Fulfillment
              </span>
              <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                Precision Production
              </h3>
              <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-['Inter',sans-serif]">
                Carefully coordinated proofing, consistent ink saturation, and durable finishing tailored to your packaging requirements.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-2 mt-4">
              <Link
                href="/quote"
                className="btn-primary w-full text-xs font-semibold py-2.5 flex items-center justify-center gap-1.5"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EB1767]" />
                <span>Verified Commercial Partner</span>
              </div>
            </div>
          </div>

          {/* RIGHT 8 COLS: 3 CONCISE PROCESS STEPS */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-4">
            
            <div className="reveal-stagger-group grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {PROCESS_STAGES.map((stage: ProcessStage) => {
                const imgSource = getImageSource(stage.imageId);
                return (
                  <div 
                    key={stage.step}
                    className="reveal-card p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between shadow-xs hover:border-zinc-700 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-zinc-800 bg-zinc-950">
                          <img 
                            src={imgSource.webp} 
                            alt={stage.imageAlt}
                            className="w-full h-full object-cover" 
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-[#EB1767]">
                              Step {stage.step}
                            </span>
                            {getStageIcon(stage.step)}
                          </div>
                          <h4 className="font-['Outfit',sans-serif] text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                            {stage.title}
                          </h4>
                        </div>
                      </div>

                      <p className="text-[11px] text-zinc-400 leading-relaxed font-['Inter',sans-serif] line-clamp-3">
                        {stage.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-zinc-800/80">
                      <p className="text-[11px] font-medium text-zinc-300">
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compact Press Capability Banner */}
            <div className="relative rounded-xl overflow-hidden border border-zinc-800 shadow-xs bg-zinc-950 h-28 sm:h-32 group">
              <picture>
                <source srcSet={heroPressWebp} type="image/webp" />
                <img 
                  src={heroPressJpg} 
                  alt="Industrial offset printing facility" 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-80"
                  loading="lazy"
                  width={1200}
                  height={400}
                />
              </picture>

              <div 
                className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/70 to-transparent pointer-events-none" 
                aria-hidden="true" 
              />

              <div className="absolute inset-0 p-4 flex items-center justify-between text-white">
                <div>
                  <p className="font-bold font-['Outfit',sans-serif] text-sm sm:text-base">Offset &amp; Commercial Press Printing</p>
                  <p className="text-zinc-300 text-[11px]">Precision CMYK ink formulation &amp; custom dielines</p>
                  <p className="text-zinc-500 text-[9px] mt-0.5 italic">Stock photo for illustrative presentation</p>
                </div>

                {onOpenCustomizer && (
                  <button
                    type="button"
                    onClick={onOpenCustomizer}
                    className="btn-primary text-xs font-semibold py-2 px-3.5 shrink-0 hidden sm:inline-flex items-center gap-1.5"
                  >
                    <span>Customizer</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ManufacturingProcess;
