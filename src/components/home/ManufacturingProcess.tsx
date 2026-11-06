import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  Palette, 
  FileCheck, 
  CheckCircle2, 
  Printer,
  ShieldCheck
} from 'lucide-react';
import { 
  PROCESS_STAGES, 
  PROCESS_SECTION_CONTENT, 
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
        return <Layers className="w-4 h-4 text-[#EB1767]" />;
      case '02':
        return <Palette className="w-4 h-4 text-[#EB1767]" />;
      case '03':
        return <FileCheck className="w-4 h-4 text-[#EB1767]" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-[#EB1767]" />;
    }
  };

  return (
    <section 
      id="how-we-work" 
      aria-labelledby="process-heading"
      className="relative w-full bg-[#121216] text-white py-16 sm:py-20 lg:py-24 border-b border-zinc-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Dark Charcoal Surface) */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EB1767]" aria-hidden="true" />
            <span>Commercial Production Standards</span>
          </div>

          <h2 
            id="process-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight leading-tight"
          >
            {PROCESS_SECTION_CONTENT.heading}
          </h2>

          <p className="mt-3.5 text-sm sm:text-base text-zinc-400 leading-relaxed font-['Inter',sans-serif]">
            {PROCESS_SECTION_CONTENT.description}
          </p>
        </div>

        {/* 12-Column Layout: Left 4 cols for Drinkware/Forming Pillar, Right 8 cols for Manufacturing Process Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ===================================================================
              CUP ANCHOR 3: LEFT SIDEWAY POINT (Reserved space for travelling cup)
              =================================================================== */}
          <div 
            id="cup-anchor-3"
            className="lg:col-span-4 rounded-3xl bg-zinc-900 border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg min-h-[380px]"
          >
            {/* Ambient warm glow ring */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#EB1767]/10 blur-2xl pointer-events-none" 
              aria-hidden="true"
            />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EB1767]/15 text-[#EB1767] text-[11px] font-mono font-bold uppercase tracking-wider mb-4 border border-[#EB1767]/30">
                <Printer className="w-3.5 h-3.5" />
                <span>Forming Calibration</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit',sans-serif] tracking-tight">
                Ultrasonic Seam Bonding
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed font-['Inter',sans-serif]">
                Precision rim curling, ultrasonic side seam bonding, and multi-ply paperboard forming engineered for beverage and carton stability.
              </p>
            </div>

            {/* Quality Metric Callout (Zero debug text, zero dashed rings) */}
            <div className="my-4 p-4 sm:p-5 rounded-2xl bg-zinc-800/80 border border-zinc-700/70 flex items-center gap-3.5">
              <span className="w-11 h-11 rounded-xl bg-zinc-900 border border-[#EB1767]/30 flex items-center justify-center text-[#EB1767] font-bold text-xs shrink-0 font-mono shadow-2xs">
                SEAL
              </span>
              <div className="text-left">
                <p className="text-xs font-bold text-white">Leak-Proof Seam Inspection</p>
                <p className="text-[11px] text-zinc-400">Precision cup rim curl &amp; thermal resistance</p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-zinc-800">
              <Link
                href="/quote?product=cups"
                className="btn-primary w-full text-xs sm:text-sm font-semibold min-h-[44px] flex items-center justify-center gap-2"
              >
                <span>Request Custom Production Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <div className="flex items-center gap-2 text-xs text-zinc-400 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EB1767]" />
                <span>Batch-tested quality standards</span>
              </div>
            </div>
          </div>

          {/* ===================================================================
              RIGHT 8 COLS: 3 MANUFACTURING STEPS + PRESS PHOTO BANNER
              =================================================================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 3 Step Sequential Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PROCESS_STAGES.map((stage: ProcessStage) => {
                const imgSource = getImageSource(stage.imageId);
                return (
                  <div 
                    key={stage.step}
                    className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col justify-between shadow-md hover:border-zinc-700 transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-zinc-800 bg-zinc-950">
                          <img 
                            src={imgSource.webp} 
                            alt={stage.imageAlt}
                            className="w-full h-full object-cover" 
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-[#EB1767] px-2 py-0.5 rounded-md bg-[#EB1767]/15 border border-[#EB1767]/30">
                              Stage {stage.step}
                            </span>
                            {getStageIcon(stage.step)}
                          </div>
                          <h4 className="font-['Outfit',sans-serif] text-sm font-bold text-white leading-snug mt-1">
                            {stage.title}
                          </h4>
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-zinc-400 leading-relaxed font-['Inter',sans-serif]">
                        {stage.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-zinc-800">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                        Focus &amp; Scope
                      </span>
                      <p className="text-xs font-semibold text-zinc-300 mt-0.5">
                        {stage.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Press Banner */}
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 shadow-md bg-zinc-950 group">
              <picture>
                <source srcSet={heroPressWebp} type="image/webp" />
                <img 
                  src={heroPressJpg} 
                  alt="Commercial multi-color offset printing press in operation" 
                  className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out opacity-85"
                  loading="lazy"
                  width={1200}
                  height={600}
                />
              </picture>

              <div 
                className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/30 to-transparent pointer-events-none" 
                aria-hidden="true" 
              />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div>
                  <p className="font-bold font-['Outfit',sans-serif] text-sm">Industrial Offset Printing Capability</p>
                  <p className="text-zinc-300 text-[11px]">Precision CMYK &amp; Pantone ink formulation</p>
                </div>

                {onOpenCustomizer && (
                  <button
                    type="button"
                    onClick={onOpenCustomizer}
                    className="btn-primary text-xs font-semibold py-2 px-4 shadow-sm"
                  >
                    <span>Launch Customizer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
