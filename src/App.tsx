import { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Layers, 
  Palette, 
  Type, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  FileCheck2,
  FolderTree,
  ExternalLink
} from 'lucide-react';
import { useLocation, Link, Route, Switch } from 'wouter';
import { LogoIntroOverlay } from './components/layout/LogoIntroOverlay';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Hero } from './components/home/Hero';
import { ProductMarquee } from './components/home/ProductMarquee';
import { ProductCategories } from './components/home/ProductCategories';
import { PackagingComparison } from './components/home/PackagingComparison';
import { ManufacturingProcess } from './components/home/ManufacturingProcess';
import { AboutSection } from './components/home/AboutSection';
import { CustomerReviews } from './components/home/CustomerReviews';
import { VideoTestimonials } from './components/home/VideoTestimonials';
import { PedestalLanding } from './components/home/PedestalLanding';
import { CinematicScrollCup } from './components/animation/CinematicScrollCup';
import { QuotationWizard } from './components/home/QuotationWizard';
import { ContactSection } from './components/home/ContactSection';
import { OfficeLocations } from './components/home/OfficeLocations';
import { Footer } from './components/layout/Footer';
import { ProductCustomizerModal, type CustomizerCategory } from './components/customizer/ProductCustomizerModal';
import { AboutPage } from './pages/AboutPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { QuotePage } from './pages/QuotePage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { CartProvider } from './context/CartContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import logoSvg from './assets/logo/logo.svg';
import cupPng from './assets/animation/cup.png';
import tableSceneJpg from './assets/animation/table-scene.jpg';
import { 
  COMPANY_IDENTITY, 
  CONTACT_INFO, 
  OFFICE_LOCATIONS, 
  CORE_PRODUCT_CATEGORIES 
} from './data/businessData';

export default function App() {
  const [location] = useLocation();

  // Coordinated Luxury Scroll Entrance System
  useScrollReveal([location]);

  // Milestone 5B: Interactive Product Customizer Modal State
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).has('customizer');
  });

  const [customizerCategory, setCustomizerCategory] = useState<CustomizerCategory>(() => {
    if (typeof window === 'undefined') return 'cups';
    const param = new URLSearchParams(window.location.search).get('customizer');
    if (param === 'boxes' || param === 'bags' || param === 'diaries' || param === 'cups') {
      return param;
    }
    return 'cups';
  });
  const [introActive, setIntroActive] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    const testStage = params.get('intro_stage');
    if (testStage === 'homepage' || testStage === 'transition') return false;
    if (testStage === 'beginning' || testStage === 'middle' || testStage === 'particles' || params.has('intro_frame')) return true;

    if (
      params.has('replay_intro') ||
      params.has('intro')
    ) {
      return true;
    }
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
      return window.sessionStorage.getItem('ui_intro_played') !== 'true';
    } catch {
      return false;
    }
  });

  const isDebug = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).has('debug') || 
    location === '/foundation'
  );

  const previewSection = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search).get('section') 
    : null;

  // Scroll to top on route change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const tokenSwatches = [
    { name: 'Canvas', cssVar: 'var(--color-canvas)', hex: '#FFFFFF', border: true },
    { name: 'Brand Magenta', cssVar: 'var(--color-brand-magenta)', hex: '#EB1767', dark: true },
    { name: 'Magenta Dark', cssVar: 'var(--color-brand-magenta-dark)', hex: '#C90E54', dark: true },
    { name: 'Brand Pink Subtle', cssVar: 'var(--color-brand-pink-subtle)', hex: '#FDF2F6', border: true },
    { name: 'Announcement Dark', cssVar: 'var(--color-announcement-bg)', hex: '#121216', dark: true },
    { name: 'Text Primary', cssVar: 'var(--color-text-primary)', hex: '#121216', dark: true },
    { name: 'Surface Muted', cssVar: 'var(--color-surface-muted)', hex: '#F4F4F5', border: true },
    { name: 'Border Subtle', cssVar: 'var(--color-border-subtle)', hex: '#E4E4E7', border: true },
  ];

  const agentSkills = [
    { name: 'frontend-design', scope: 'Anti-AI aesthetic & typography standards' },
    { name: 'gsap-scrolltrigger', scope: 'Scroll-linked animation guidelines' },
    { name: 'gsap-react', scope: 'React 19 lifecycle safety & useGSAP' },
    { name: 'gsap-performance', scope: '60fps GPU compositor & render efficiency' },
    { name: 'united-impex-reference-design', scope: 'Reference-first workflow & 10-point visual QA' },
    { name: 'united-impex-seo-quality', scope: 'Technical SEO, CWV & WCAG 2.1 AA accessibility' },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen w-full bg-white text-[#121216] font-['Inter',sans-serif] flex flex-col selection:bg-[#EB1767] selection:text-white">
        {/* Milestone 2D: Opening Logo Dissolve Animation Overlay */}
        <LogoIntroOverlay onComplete={() => setIntroActive(false)} />

      {/* Website Container — preloaded and rendered behind intro, instantly revealed upon completion */}
      <div 
        aria-hidden={introActive}
        className={`flex flex-col flex-1 w-full ${
          introActive ? 'pointer-events-none select-none' : 'pointer-events-auto'
        }`}
      >
        {/* Milestone 2A: Semantic Announcement Bar in Natural Document Flow */}
        <AnnouncementBar />

        {/* Milestone 2B: Liquid Glass Desktop Navbar */}
        <Navbar introActive={introActive} />

        {/* Main Content Landmark */}
        <main id="main-content" className="flex-1 w-full bg-white pb-24 md:pb-0">
          {/* Direct Section Preview (Supports deterministic visual QA inspection) */}
          {previewSection === 'categories' && (
            <div className="pt-16 sm:pt-20">
              <ProductCategories 
                onOpenCustomizer={(cat) => {
                  if (cat) setCustomizerCategory(cat);
                  setIsCustomizerOpen(true);
                }}
              />
            </div>
          )}

          {previewSection === 'comparison' && (
            <div className="pt-16 sm:pt-20">
              <PackagingComparison 
                onOpenCustomizer={(cat) => {
                  if (cat) setCustomizerCategory(cat);
                  setIsCustomizerOpen(true);
                }}
              />
            </div>
          )}

          {previewSection === 'manufacturing' && (
            <div className="pt-16 sm:pt-20">
              <ManufacturingProcess 
                onOpenCustomizer={() => setIsCustomizerOpen(true)}
              />
            </div>
          )}

          {previewSection === 'about' && (
            <div className="pt-16 sm:pt-20">
              <AboutSection />
            </div>
          )}

          {(previewSection === 'table' || previewSection === 'landing') && (
            <div className="pt-16 sm:pt-20">
              <PedestalLanding 
                onOpenCustomizer={(cat) => {
                  if (cat) setCustomizerCategory(cat);
                  setIsCustomizerOpen(true);
                }}
              />
            </div>
          )}

          {previewSection === 'quote' && (
            <div className="pt-16 sm:pt-20">
              <QuotationWizard 
                initialCategory={customizerCategory}
              />
            </div>
          )}

          {previewSection === 'locations' && (
            <div className="pt-16 sm:pt-20">
              <OfficeLocations />
            </div>
          )}

          {previewSection === 'footer' && (
            <div className="pt-16 sm:pt-20">
              <Footer 
                onOpenCustomizer={(cat) => {
                  if (cat) setCustomizerCategory(cat);
                  setIsCustomizerOpen(true);
                }}
              />
            </div>
          )}

          {/* 1. Primary Homepage View: Full Sequence */}
          {location === '/' && !isDebug && !previewSection && (
            <>
              {/* Milestone 12: Continuous Cinematic Hero-to-Table Cup Flight */}
              <CinematicScrollCup />
              <Hero 
                onOpenCustomizer={(cat) => {
                  if (cat) setCustomizerCategory(cat);
                  setIsCustomizerOpen(true);
                }}
              />
              <ProductMarquee />
              <ProductCategories 
                onOpenCustomizer={(cat) => {
                  if (cat) setCustomizerCategory(cat);
                  setIsCustomizerOpen(true);
                }}
              />
              <PackagingComparison 
                onOpenCustomizer={(cat) => {
                  if (cat) setCustomizerCategory(cat);
                  setIsCustomizerOpen(true);
                }}
              />
              <ManufacturingProcess 
                onOpenCustomizer={() => setIsCustomizerOpen(true)}
              />
              <AboutSection />
              <CustomerReviews />
              <VideoTestimonials 
                onOpenCustomizer={() => setIsCustomizerOpen(true)}
              />
              <PedestalLanding 
                onOpenCustomizer={(cat) => {
                  if (cat) setCustomizerCategory(cat);
                  setIsCustomizerOpen(true);
                }}
              />
              <QuotationWizard 
                initialCategory={customizerCategory}
              />
              <ContactSection />
              <OfficeLocations />
            </>
          )}

          {/* 2. Dedicated Website Routes (Milestone 13 + Ecommerce Package) */}
          {location !== '/' && !isDebug && !previewSection && (
            <Switch>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/cart">
                <CartPage />
              </Route>
              <Route path="/products/:slug">
                <ProductDetailPage 
                  onOpenCustomizer={(cat) => {
                    if (cat) setCustomizerCategory(cat);
                    setIsCustomizerOpen(true);
                  }}
                />
              </Route>
              <Route path="/products">
                <ProductsPage 
                  onOpenCustomizer={(cat) => {
                    if (cat) setCustomizerCategory(cat);
                    setIsCustomizerOpen(true);
                  }}
                />
              </Route>
              <Route path="/quote">
                <QuotePage />
              </Route>
              <Route path="/contact">
                <ContactPage />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          )}

          {/* 3. Preserved Foundation Verification Dashboard (Accessible via ?debug=true or /foundation) */}
          {isDebug && (
            <div className="max-w-5xl mx-auto px-4 pt-6 pb-28 md:pt-8 md:pb-12 sm:px-6 lg:px-12 space-y-8">
              <div className="p-3 bg-zinc-900 text-white rounded-xl text-xs flex items-center justify-between">
                <span>Developer Inspection Mode: Milestone 1 Foundation Verification Dashboard</span>
                <Link href="/" className="text-[#EB1767] hover:underline font-semibold">&larr; Return to Public Hero</Link>
              </div>

              {/* Foundation Header */}
              <header className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200/80">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-zinc-100">
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-auto flex items-center justify-center bg-white p-2 rounded-xl border border-zinc-100 shadow-xs">
                      <img 
                        src={logoSvg} 
                        alt={COMPANY_IDENTITY.name} 
                        className="h-10 w-auto object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold font-['Outfit',sans-serif] tracking-tight text-zinc-900">
                        {COMPANY_IDENTITY.name}
                      </h1>
                      <p className="text-sm text-zinc-500 font-medium">
                        {COMPANY_IDENTITY.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex flex-wrap items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold max-w-full">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Milestone 1 — Architecture &amp; Foundation Verified</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-zinc-600">
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                    <Layers className="w-4 h-4 text-[#EB1767]" />
                    <span>React 19 + TypeScript + Vite 8</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                    <Palette className="w-4 h-4 text-[#EB1767]" />
                    <span>Tailwind CSS v4 + Native CSS Variables</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
                    <ShieldCheck className="w-4 h-4 text-[#EB1767]" />
                    <span>Visiting Card Truth &amp; Anti-Fabrication</span>
                  </div>
                </div>
              </header>

              {/* Section 1: Color Tokens */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200/80 space-y-4">
                <div className="flex items-center gap-2 text-zinc-900">
                  <Palette className="w-5 h-5 text-[#EB1767]" />
                  <h2 className="text-lg font-bold font-['Outfit',sans-serif]">Design System Color Tokens</h2>
                </div>
                <p className="text-sm text-zinc-500">
                  Pure white minimalist packaging canvas with client-matched magenta accent (#EB1767, WCAG AA 4.6:1 compliant).
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {tokenSwatches.map((t) => (
                    <div 
                      key={t.name}
                      className="p-3 rounded-xl border border-zinc-200/60 bg-white shadow-2xs flex flex-col gap-2"
                    >
                      <div 
                        className={`h-12 w-full rounded-lg ${t.border ? 'border border-zinc-200' : ''}`}
                        style={{ backgroundColor: t.hex }}
                      />
                      <div>
                        <p className="text-xs font-semibold text-zinc-800">{t.name}</p>
                        <p className="text-[11px] font-mono text-zinc-400">{t.hex}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 2: Typography System */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200/80 space-y-4">
                <div className="flex items-center gap-2 text-zinc-900">
                  <Type className="w-5 h-5 text-[#EB1767]" />
                  <h2 className="text-lg font-bold font-['Outfit',sans-serif]">Typography Verification</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Heading Font</span>
                      <span className="text-xs font-mono text-[#EB1767] font-semibold">Outfit (Google Fonts)</span>
                    </div>
                    <h3 className="font-['Outfit',sans-serif] text-2xl font-bold text-zinc-900">
                      Premium Custom Packaging
                    </h3>
                    <p className="font-['Outfit',sans-serif] text-base font-semibold text-zinc-700">
                      Medium / SemiBold Heading Structure (400, 500, 600, 700)
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Body Font</span>
                      <span className="text-xs font-mono text-[#EB1767] font-semibold">Inter (Google Fonts)</span>
                    </div>
                    <p className="font-['Inter',sans-serif] text-sm text-zinc-700 leading-relaxed">
                      Clean, legible body typography optimized for e-commerce catalog specifications, high contrast reading, and B2B quotation inquiries.
                    </p>
                    <p className="font-['Inter',sans-serif] text-xs text-zinc-500">
                      Regular / Medium Body Scale (300, 400, 500, 600)
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: Verified Client Identity & Anti-Fabrication */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200/80 space-y-4">
                <div className="flex items-center gap-2 text-zinc-900">
                  <FileCheck2 className="w-5 h-5 text-[#EB1767]" />
                  <h2 className="text-lg font-bold font-['Outfit',sans-serif]">Verified Business Data (From Visiting Card)</h2>
                </div>
                <p className="text-sm text-zinc-500">
                  All details verified against official client visiting card PDF (<code>United Impex VC Card(1).pdf</code>).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                      <ShieldCheck className="w-4 h-4 text-[#EB1767]" />
                      <span>Identity &amp; Leadership</span>
                    </div>
                    <div className="text-xs space-y-1.5 text-zinc-600">
                      <p><strong className="text-zinc-800">Company:</strong> {COMPANY_IDENTITY.name}</p>
                      <p><strong className="text-zinc-800">Official Description:</strong> {COMPANY_IDENTITY.businessDescription}</p>
                      <p><strong className="text-zinc-800">Leadership:</strong> {COMPANY_IDENTITY.leadership.name} — <span className="text-[#EB1767] font-semibold">{COMPANY_IDENTITY.leadership.designation}</span> (Verified Director, not CEO)</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-semibold text-zinc-800">
                      <Phone className="w-4 h-4 text-[#EB1767]" />
                      <span>Verified Direct Contacts</span>
                    </div>
                    <div className="text-xs space-y-1.5 text-zinc-600">
                      <p className="flex items-center gap-2">
                        <strong className="text-zinc-800">Phone:</strong> 
                        <a href={CONTACT_INFO.phoneTel} className="text-[#EB1767] hover:underline font-mono">
                          {CONTACT_INFO.phoneDisplay}
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        <strong className="text-zinc-800">WhatsApp:</strong> 
                        <a href={CONTACT_INFO.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-mono inline-flex items-center gap-1">
                          {CONTACT_INFO.whatsappNumber} <ExternalLink className="w-3 h-3" />
                        </a>
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-zinc-400" />
                        <strong className="text-zinc-800">Email:</strong> 
                        <a href={CONTACT_INFO.emailMailto} className="text-[#EB1767] hover:underline font-mono">
                          {CONTACT_INFO.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {OFFICE_LOCATIONS.map((office) => (
                    <div key={office.city} className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/70 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800">
                          <MapPin className="w-3.5 h-3.5 text-[#EB1767]" />
                          {office.city} ({office.type})
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-200/60 text-zinc-700">
                          Verified
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 leading-relaxed font-mono">
                        {office.address}
                      </p>
                      <p className="text-[11px] text-zinc-500 italic">
                        Note: {office.note}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4: Key Visual Assets Verification */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200/80 space-y-4">
                <div className="flex items-center gap-2 text-zinc-900">
                  <FolderTree className="w-5 h-5 text-[#EB1767]" />
                  <h2 className="text-lg font-bold font-['Outfit',sans-serif]">Core Asset Pipeline Loading Status</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-3 rounded-xl border border-zinc-200 bg-white space-y-2">
                    <span className="text-xs font-bold text-zinc-500">Vector Logo SVG</span>
                    <div className="h-28 flex items-center justify-center p-3 bg-zinc-50 rounded-lg">
                      <img src={logoSvg} alt="Vector Logo" className="max-h-16 w-auto object-contain" />
                    </div>
                    <p className="text-[11px] text-zinc-500 font-mono">src/assets/logo/logo.svg</p>
                  </div>

                  <div className="p-3 rounded-xl border border-zinc-200 bg-white space-y-2">
                    <span className="text-xs font-bold text-zinc-500">Scroll Cup PNG</span>
                    <div className="h-28 flex items-center justify-center p-3 bg-zinc-50 rounded-lg">
                      <img src={cupPng} alt="Coffee Cup" className="max-h-24 w-auto object-contain" />
                    </div>
                    <p className="text-[11px] text-zinc-500 font-mono">src/assets/animation/cup.png</p>
                  </div>

                  <div className="p-3 rounded-xl border border-zinc-200 bg-white space-y-2">
                    <span className="text-xs font-bold text-zinc-500">Landing Scene JPG</span>
                    <div className="h-28 overflow-hidden rounded-lg">
                      <img src={tableSceneJpg} alt="Table Scene" className="h-full w-full object-cover" />
                    </div>
                    <p className="text-[11px] text-zinc-500 font-mono">src/assets/animation/table-scene.jpg</p>
                  </div>
                </div>

                {/* Product Categories Ref */}
                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Curated Product Image Directories
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CORE_PRODUCT_CATEGORIES.map((cat) => (
                      <div key={cat.id} className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200/60 text-xs">
                        <p className="font-semibold text-zinc-800">{cat.title}</p>
                        <p className="text-[11px] text-zinc-400 font-mono">/products/{cat.slug}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Section 5: Agent Skills Status */}
              <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-zinc-200/80 space-y-4">
                <div className="flex items-center gap-2 text-zinc-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-bold font-['Outfit',sans-serif]">Active Agent Skills Discovery</h2>
                </div>
                <p className="text-sm text-zinc-500">
                  Inherited via native junction from root <code>.agents/skills/</code> to nested <code>united-impex-app/.agents/skills/</code>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {agentSkills.map((s) => (
                    <div key={s.name} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/60 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold font-mono text-zinc-900">{s.name}</p>
                        <p className="text-[11px] text-zinc-500">{s.scope}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Footer Note */}
              <footer className="text-center text-xs text-zinc-400 pt-4 pb-8">
                United Impex Web Application Foundation &bull; Milestone 2D: Opening Logo Dissolve Active &bull; Milestone 3B: Hero Section Active
              </footer>
            </div>
          )}
        </main>

        {/* Milestone 10: Premium Website Footer */}
        <Footer 
          onOpenCustomizer={(cat) => {
            if (cat) setCustomizerCategory(cat);
            setIsCustomizerOpen(true);
          }}
        />

        {/* Milestone 5B: Interactive Product Customization Modal */}
        <ProductCustomizerModal 
          isOpen={isCustomizerOpen} 
          onClose={() => setIsCustomizerOpen(false)} 
          initialCategory={customizerCategory} 
        />

        {/* Milestone 2C: Mobile Liquid Glass Bottom Navigation Dock */}
        <MobileBottomNav isHidden={introActive || isCustomizerOpen} />
      </div>
    </div>
    </CartProvider>
  );
}
