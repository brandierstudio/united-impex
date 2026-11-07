import React, { useState } from 'react';
import { 
  Coffee, 
  Package, 
  ShoppingBag, 
  Book, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Edit3, 
  AlertCircle,
  Layers,
  Palette
} from 'lucide-react';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { 
  PRODUCT_OPTIONS, 
  INITIAL_QUOTE_FORM_DATA, 
  formatWhatsAppQuoteMessage,
  type QuoteFormData,
  type ProductOption
} from '../../data/quoteWizardData';
import { CONTACT_INFO } from '../../data/businessData';

interface QuotationWizardProps {
  initialCategory?: 'cups' | 'boxes' | 'bags' | 'diaries';
}

export const QuotationWizard: React.FC<QuotationWizardProps> = ({ initialCategory }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<QuoteFormData>(() => ({
    ...INITIAL_QUOTE_FORM_DATA,
    selectedCategory: initialCategory || 'cups'
  }));

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const activeProduct: ProductOption = PRODUCT_OPTIONS.find(
    p => p.category === formData.selectedCategory
  ) || PRODUCT_OPTIONS[0];

  const getProductIcon = (category: string) => {
    switch (category) {
      case 'cups':
        return <Coffee className="w-5 h-5 text-[#EB1767]" />;
      case 'boxes':
        return <Package className="w-5 h-5 text-[#EB1767]" />;
      case 'bags':
        return <ShoppingBag className="w-5 h-5 text-[#EB1767]" />;
      case 'diaries':
        return <Book className="w-5 h-5 text-[#EB1767]" />;
      default:
        return <Package className="w-5 h-5 text-[#EB1767]" />;
    }
  };

  const handleCategorySelect = (category: 'cups' | 'boxes' | 'bags' | 'diaries') => {
    const newProduct = PRODUCT_OPTIONS.find(p => p.category === category) || PRODUCT_OPTIONS[0];
    setFormData(prev => ({
      ...prev,
      selectedCategory: category,
      dimensions: newProduct.dimensionSuggestions[0] || '',
      material: newProduct.materials[0] || '',
      finish: newProduct.finishes[0] || ''
    }));
  };

  const validateStep3 = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone / WhatsApp number is required';
    } else if (formData.phone.trim().length < 10) {
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 3) {
      if (!validateStep3()) return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleWhatsAppSubmit = () => {
    if (!validateStep3()) {
      setCurrentStep(3);
      return;
    }
    const message = formatWhatsAppQuoteMessage(formData);
    const whatsappUrl = `https://wa.me/923714799755?text=${message}`;
    
    // Open WhatsApp in new tab gracefully
    setIsSubmitted(true);
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const stepsList = [
    { number: 1, title: 'Product' },
    { number: 2, title: 'Requirements' },
    { number: 3, title: 'Client Info' },
    { number: 4, title: 'Review & Submit' }
  ];

  return (
    <section 
      id="quote-wizard" 
      aria-labelledby="wizard-heading"
      className="relative w-full bg-[#FDF2F6] text-[#121216] py-10 sm:py-14 lg:py-16 border-b border-[#EB1767]/15 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================================
            1. SECTION HEADER
            ========================================================================= */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#EB1767]/20 text-[#EB1767] text-xs font-semibold uppercase tracking-wider mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Multi-Step Estimator</span>
          </div>

          <h2 
            id="wizard-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121216] font-['Outfit',sans-serif] tracking-tight leading-tight"
          >
            Request a Custom Packaging Quote.
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed font-['Inter',sans-serif]">
            Configure your packaging specifications in four quick steps. Get an itemized production quote directly from our coordination desk.
          </p>
        </div>

        {/* =========================================================================
            2. STEP PROGRESS INDICATOR
            ========================================================================= */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="flex items-center justify-between relative">
            {/* Connecting Track */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-200 -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-[#EB1767] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (stepsList.length - 1)) * 100}%` }}
            />

            {stepsList.map(step => {
              const isCompleted = step.number < currentStep;
              const isCurrent = step.number === currentStep;
              return (
                <div key={step.number} className="relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => {
                      if (step.number < currentStep) setCurrentStep(step.number);
                    }}
                    disabled={step.number > currentStep}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-['Outfit',sans-serif] transition-all duration-200 ${
                      isCompleted 
                        ? 'bg-[#EB1767] text-white shadow-xs cursor-pointer' 
                        : isCurrent 
                          ? 'bg-zinc-900 text-white ring-4 ring-[#EB1767]/20' 
                          : 'bg-white text-zinc-400 border-2 border-zinc-200 cursor-not-allowed'
                    }`}
                    aria-label={`Go to step ${step.number}: ${step.title}`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
                  </button>
                  <span className={`text-[11px] font-medium mt-1.5 hidden sm:block ${
                    isCurrent ? 'text-zinc-900 font-bold' : isCompleted ? 'text-[#EB1767]' : 'text-zinc-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            3. WIZARD CARD CONTAINER
            ========================================================================= */}
        <div className="bg-white rounded-3xl border border-[#EB1767]/15 shadow-xl p-6 sm:p-10 transition-all duration-300">
          
          {/* -----------------------------------------------------------------------
              STEP 1: SELECT PACKAGING PRODUCT
              ----------------------------------------------------------------------- */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-zinc-100 pb-4">
                <span className="text-xs font-bold text-[#EB1767] uppercase tracking-wider font-mono">
                  Step 01 of 04
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-zinc-900 mt-1">
                  Select Packaging Product
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Choose the core product category for your commercial print inquiry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PRODUCT_OPTIONS.map(prod => {
                  const isSelected = formData.selectedCategory === prod.category;
                  return (
                    <div
                      key={prod.id}
                      onClick={() => handleCategorySelect(prod.category)}
                      className={`p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-start gap-4 ${
                        isSelected 
                          ? 'border-[#EB1767] bg-[#FDF2F6]/40 shadow-xs' 
                          : 'border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-zinc-50/50'
                      }`}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') {
                          e.preventDefault();
                          handleCategorySelect(prod.category);
                        }
                      }}
                    >
                      <div className={`p-3 rounded-xl shrink-0 ${isSelected ? 'bg-[#EB1767] text-white' : 'bg-zinc-100 text-zinc-700'}`}>
                        {getProductIcon(prod.category)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm sm:text-base font-bold text-zinc-900 font-['Outfit',sans-serif]">
                            {prod.title}
                          </h4>
                          <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-[#EB1767] bg-[#EB1767]' : 'border-zinc-300 bg-white'
                          }`}>
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                          {prod.shortDesc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              STEP 2: PACKAGING REQUIREMENTS
              ----------------------------------------------------------------------- */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-zinc-100 pb-4">
                <span className="text-xs font-bold text-[#EB1767] uppercase tracking-wider font-mono">
                  Step 02 of 04
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-zinc-900 mt-1">
                  Packaging Specifications for {activeProduct.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Define your estimated volume, dimensions, substrate material, and print finish.
                </p>
              </div>

              {/* Quantity Selection */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                  1. Order Quantity
                </label>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.defaultQuantities.map(qty => (
                    <button
                      key={qty}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, quantity: qty.toString(), customQuantity: '' }))}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                        formData.quantity === qty.toString() && !formData.customQuantity
                          ? 'bg-zinc-900 text-white border-zinc-900'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      {qty.toLocaleString()} units
                    </button>
                  ))}
                </div>

                <div className="pt-1.5">
                  <input
                    type="number"
                    placeholder="Or enter custom quantity (e.g. 15000)"
                    value={formData.customQuantity}
                    onChange={(e) => setFormData(prev => ({ ...prev, customQuantity: e.target.value }))}
                    className="w-full sm:w-72 px-4 py-3 rounded-xl border border-zinc-200 text-base sm:text-sm min-h-[44px] focus:ring-2 focus:ring-[#EB1767] focus:outline-none"
                  />
                </div>
              </div>

              {/* Dimensions / Capacity */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-100">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                  2. Dimensions / Capacity
                </label>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.dimensionSuggestions.map(dim => (
                    <button
                      key={dim}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, dimensions: dim }))}
                      className={`px-4 py-2.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer min-h-[40px] ${
                        formData.dimensions === dim
                          ? 'bg-[#FDF2F6] text-[#EB1767] border-[#EB1767]/40 font-semibold'
                          : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-zinc-300'
                      }`}
                    >
                      {dim}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder={activeProduct.dimensionPlaceholder}
                  value={formData.dimensions}
                  onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-base sm:text-sm min-h-[44px] focus:ring-2 focus:ring-[#EB1767] focus:outline-none mt-1"
                />
              </div>

              {/* Material Substrate */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-100">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#EB1767]" />
                  <span>3. Preferred Paperboard / Material</span>
                </label>
                <select
                  value={formData.material}
                  onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-base sm:text-sm min-h-[44px] text-zinc-800 bg-white focus:ring-2 focus:ring-[#EB1767] focus:outline-none"
                >
                  {activeProduct.materials.map(mat => (
                    <option key={mat} value={mat}>{mat}</option>
                  ))}
                </select>
              </div>

              {/* Printing & Finishing */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-100">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#EB1767]" />
                  <span>4. Printing &amp; Surface Finish</span>
                </label>
                <select
                  value={formData.finish}
                  onChange={(e) => setFormData(prev => ({ ...prev, finish: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-base sm:text-sm min-h-[44px] text-zinc-800 bg-white focus:ring-2 focus:ring-[#EB1767] focus:outline-none"
                >
                  {activeProduct.finishes.map(fin => (
                    <option key={fin} value={fin}>{fin}</option>
                  ))}
                </select>
              </div>

              {/* Artwork Status */}
              <div className="space-y-2.5 pt-2 border-t border-zinc-100">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                  5. Artwork File Status
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'ready', label: 'Vector File Ready', sub: 'AI / PDF / EPS format' },
                    { id: 'need_design', label: 'Need Design Help', sub: 'Assistance with dielines' },
                    { id: 'reorder', label: 'Reordering', sub: 'Existing repeat artwork' }
                  ].map(art => (
                    <div
                      key={art.id}
                      onClick={() => setFormData(prev => ({ ...prev, artworkStatus: art.id as any }))}
                      className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                        formData.artworkStatus === art.id
                          ? 'border-[#EB1767] bg-[#FDF2F6] font-semibold text-zinc-900'
                          : 'border-zinc-200 bg-zinc-50 hover:border-zinc-300 text-zinc-700'
                      }`}
                    >
                      <p className="font-semibold text-zinc-900">{art.label}</p>
                      <p className="text-[11px] text-zinc-500">{art.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              STEP 3: CUSTOMER INFORMATION
              ----------------------------------------------------------------------- */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-zinc-100 pb-4">
                <span className="text-xs font-bold text-[#EB1767] uppercase tracking-wider font-mono">
                  Step 03 of 04
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-zinc-900 mt-1">
                  Contact &amp; Delivery Information
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Enter your details so our Karachi or Multan coordination team can deliver an accurate quote.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block">
                    Full Name <span className="text-[#EB1767]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Areeb or Company Contact"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, fullName: e.target.value }));
                      if (validationErrors.fullName) setValidationErrors(prev => ({ ...prev, fullName: '' }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-base sm:text-sm min-h-[44px] focus:ring-2 focus:ring-[#EB1767] focus:outline-none ${
                      validationErrors.fullName ? 'border-red-400 bg-red-50/30' : 'border-zinc-200'
                    }`}
                  />
                  {validationErrors.fullName && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{validationErrors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Business / Brand Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block">
                    Business / Brand Name <span className="text-zinc-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Artisan Roasters or Retail Store"
                    value={formData.businessName}
                    onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-base sm:text-sm min-h-[44px] focus:ring-2 focus:ring-[#EB1767] focus:outline-none"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block">
                    Phone / WhatsApp Number <span className="text-[#EB1767]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 0371 4799755 or +92 300 1234567"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, phone: e.target.value }));
                      if (validationErrors.phone) setValidationErrors(prev => ({ ...prev, phone: '' }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-base sm:text-sm min-h-[44px] focus:ring-2 focus:ring-[#EB1767] focus:outline-none ${
                      validationErrors.phone ? 'border-red-400 bg-red-50/30' : 'border-zinc-200'
                    }`}
                  />
                  {validationErrors.phone && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{validationErrors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-700 block">
                    Email Address <span className="text-[#EB1767]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. client@example.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, email: e.target.value }));
                      if (validationErrors.email) setValidationErrors(prev => ({ ...prev, email: '' }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-base sm:text-sm min-h-[44px] focus:ring-2 focus:ring-[#EB1767] focus:outline-none ${
                      validationErrors.email ? 'border-red-400 bg-red-50/30' : 'border-zinc-200'
                    }`}
                  />
                  {validationErrors.email && (
                    <p className="text-[11px] text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{validationErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-700 block">
                    Delivery / Coordination City
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-base sm:text-sm min-h-[44px] text-zinc-800 bg-white focus:ring-2 focus:ring-[#EB1767] focus:outline-none"
                  >
                    <option value="Karachi">Karachi (Direct Office Coordination)</option>
                    <option value="Multan">Multan (Direct Office Coordination)</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad / Rawalpindi">Islamabad / Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                    <option value="Other">Other City in Pakistan</option>
                  </select>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-zinc-700 block">
                    Additional Project Notes or Target Deadline <span className="text-zinc-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention any delivery deadlines, special packaging details, or packaging samples requested."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 text-base sm:text-sm focus:ring-2 focus:ring-[#EB1767] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* -----------------------------------------------------------------------
              STEP 4: REVIEW & SUBMIT
              ----------------------------------------------------------------------- */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="border-b border-zinc-100 pb-4">
                <span className="text-xs font-bold text-[#EB1767] uppercase tracking-wider font-mono">
                  Step 04 of 04
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-['Outfit',sans-serif] text-zinc-900 mt-1">
                  Review Quotation Specifications
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Verify your selections below. Click "Continue to WhatsApp" to initiate direct coordination with our team.
                </p>
              </div>

              {/* Review Table / Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product Summary */}
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">
                      Packaging Specifications
                    </span>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="text-[#EB1767] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <p><strong className="text-zinc-700">Product:</strong> {activeProduct.title}</p>
                  <p><strong className="text-zinc-700">Quantity:</strong> {formData.customQuantity ? `${formData.customQuantity} (Custom)` : `${formData.quantity} units`}</p>
                  <p><strong className="text-zinc-700">Size / Capacity:</strong> {formData.dimensions || 'Standard'}</p>
                  <p><strong className="text-zinc-700">Substrate:</strong> {formData.material}</p>
                  <p><strong className="text-zinc-700">Finish:</strong> {formData.finish}</p>
                  <p><strong className="text-zinc-700">Artwork:</strong> {formData.artworkStatus === 'ready' ? 'Vector AI/PDF ready' : formData.artworkStatus === 'need_design' ? 'Need design help' : 'Reorder'}</p>
                </div>

                {/* Client Summary */}
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/70 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-zinc-900 uppercase tracking-wider text-[11px]">
                      Contact Information
                    </span>
                    <button
                      onClick={() => setCurrentStep(3)}
                      className="text-[#EB1767] hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <p><strong className="text-zinc-700">Client Name:</strong> {formData.fullName || '—'}</p>
                  {formData.businessName && <p><strong className="text-zinc-700">Business:</strong> {formData.businessName}</p>}
                  <p><strong className="text-zinc-700">Phone:</strong> {formData.phone || '—'}</p>
                  <p><strong className="text-zinc-700">Email:</strong> {formData.email || '—'}</p>
                  <p><strong className="text-zinc-700">Destination:</strong> {formData.city}</p>
                  {formData.additionalNotes && <p><strong className="text-zinc-700">Notes:</strong> {formData.additionalNotes}</p>}
                </div>
              </div>

              {/* Informative Submission Notice */}
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 leading-relaxed flex items-start gap-3">
                <WhatsAppIcon className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-semibold text-zinc-900">Direct WhatsApp Coordination Desk</strong>
                  Clicking below will format your complete inquiry and open a direct chat with our official coordination number ({CONTACT_INFO.whatsappNumber}). You can attach your logo or vector dieline file directly in the chat window.
                </div>
              </div>

              {isSubmitted && (
                <div className="p-3 bg-zinc-100 rounded-xl text-xs text-zinc-600 flex items-center justify-between">
                  <span>Inquiry opened in WhatsApp. If a popup blocker stopped it:</span>
                  <a
                    href={`https://wa.me/923714799755?text=${formatWhatsAppQuoteMessage(formData)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#EB1767] hover:underline"
                  >
                    Click to Open WhatsApp Directly &rarr;
                  </a>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              NAVIGATION CONTROLS
              ========================================================================= */}
          <div className="mt-8 pt-6 pb-6 sm:pb-0 border-t border-zinc-100 flex items-center justify-between gap-4">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="btn-secondary text-xs sm:text-sm font-semibold min-h-[48px] px-5 py-3 inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="btn-primary text-xs sm:text-sm font-bold min-h-[48px] px-7 py-3 inline-flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="btn-primary text-xs sm:text-sm font-bold min-h-[48px] px-6 py-3 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current text-white" />
                <span>Continue to WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
