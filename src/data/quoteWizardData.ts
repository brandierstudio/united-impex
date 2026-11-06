/**
 * United Impex — Multi-Step Quotation Wizard Data & Configuration
 * 
 * Sourced according to Milestone 10 specifications:
 * - Products: Coffee Cups, Packaging Boxes, Paper Bags, Diaries
 * - Step options, quantities, finishes, and WhatsApp message generator
 * - Official WhatsApp number: +92 371 4799755
 */

export interface ProductOption {
  id: string;
  category: 'cups' | 'boxes' | 'bags' | 'diaries';
  title: string;
  shortDesc: string;
  iconName: string;
  defaultQuantities: number[];
  dimensionPlaceholder: string;
  dimensionSuggestions: string[];
  materials: string[];
  finishes: string[];
}

export interface QuoteFormData {
  // Step 1
  selectedCategory: 'cups' | 'boxes' | 'bags' | 'diaries';
  // Step 2
  quantity: string;
  customQuantity: string;
  dimensions: string;
  material: string;
  finish: string;
  artworkStatus: 'ready' | 'need_design' | 'reorder';
  specialRequirements: string;
  // Step 3
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  city: string;
  additionalNotes: string;
}

export const PRODUCT_OPTIONS: ProductOption[] = [
  {
    id: 'cups',
    category: 'cups',
    title: 'Disposable Coffee Cups',
    shortDesc: 'Single-wall, double-wall, and ripple insulated paper cups for cafes and beverage brands.',
    iconName: 'Coffee',
    defaultQuantities: [500, 1000, 2500, 5000, 10000],
    dimensionPlaceholder: 'e.g. 8oz, 12oz, or 16oz',
    dimensionSuggestions: ['8oz (240ml)', '12oz (350ml)', '16oz (480ml)', 'Custom Capacity'],
    materials: [
      'Double-Wall Insulated Cup Board',
      'Single-Wall High-Density Paperboard',
      'Ripple Wrap Textured Board',
      'Eco Natural Kraft Cup Board'
    ],
    finishes: [
      'Full Color CMYK Offset Print',
      '1-2 Spot Color Pantone Print',
      'Matte Finish Coating',
      'Gloss Water-Resistant Coating',
      'Plain White Unprinted Stock'
    ]
  },
  {
    id: 'boxes',
    category: 'boxes',
    title: 'Custom Packaging Boxes',
    shortDesc: 'Folding retail cartons, corrugated shipping mailers, and luxury rigid presentation boxes.',
    iconName: 'Box',
    defaultQuantities: [250, 500, 1000, 2500, 5000],
    dimensionPlaceholder: 'e.g. 10 x 8 x 4 inches (L x W x H)',
    dimensionSuggestions: ['Small Retail: 6 x 4 x 2 in', 'Medium Mailer: 10 x 7 x 3 in', 'Large Box: 14 x 10 x 4 in', 'Custom Dieline Specs'],
    materials: [
      'Virgin White SBS Paperboard (350–450 GSM)',
      'E-Flute Corrugated Mailer Board',
      'Natural Brown Kraft Folding Board',
      'Rigid Greyboard with Art Paper Wrap'
    ],
    finishes: [
      'Matte Soft-Touch Lamination',
      'Gloss Protective Lamination',
      'Spot UV Gloss Highlights',
      'Metallic Gold / Silver Foil Debossing',
      'Standard Offset CMYK Print'
    ]
  },
  {
    id: 'bags',
    category: 'bags',
    title: 'Paper Shopping Bags',
    shortDesc: 'Eco-friendly retail carrier bags with twisted paper, flat tape, or cotton ribbon handles.',
    iconName: 'ShoppingBag',
    defaultQuantities: [500, 1000, 2500, 5000, 10000],
    dimensionPlaceholder: 'e.g. 10 x 12 x 4 inches (W x H x Gusset)',
    dimensionSuggestions: ['Small Boutique: 8 x 10 x 4 in', 'Medium Retail: 10 x 13 x 5 in', 'Large Carrier: 16 x 14 x 6 in', 'Custom Dimensions'],
    materials: [
      'Natural Brown Kraft (120–180 GSM)',
      'Bleached White Kraft Paperboard',
      'Luxury Coated Art Paper (210–250 GSM)',
      'Recycled Earth-Tone Kraft'
    ],
    finishes: [
      'Twisted Paper Rope Handles',
      'Flat Folded Paper Handles',
      'Satin Ribbon / Cotton Cord Handles',
      'Full Exterior CMYK Printing',
      'Spot Pantone Brand Logo Print'
    ]
  },
  {
    id: 'diaries',
    category: 'diaries',
    title: 'Corporate Diaries & Notebooks',
    shortDesc: 'Executive hardbound journals, softcover planners, and embossed corporate notebooks.',
    iconName: 'Book',
    defaultQuantities: [100, 250, 500, 1000, 2500],
    dimensionPlaceholder: 'e.g. A5 (148 x 210 mm) or Executive B5',
    dimensionSuggestions: ['Standard A5 (148 x 210 mm)', 'Executive B5 (176 x 250 mm)', 'Pocket Notebook (90 x 140 mm)', 'Custom Page Count'],
    materials: [
      'Premium Leatherette Hardcover',
      'Textured Linen Cloth Binding',
      'Rigid Matte Hardboard with Custom Wrap',
      'Flexible Softcover Cardstock'
    ],
    finishes: [
      'Blind Debossing / Hot Foil Stamping',
      'Gilt Gold / Silver Page Edges',
      'Ribbon Marker & Elastic Band Closure',
      'Custom Printed Watermark Flyleaves',
      'Executive Pen Holder Loop'
    ]
  }
];

export const INITIAL_QUOTE_FORM_DATA: QuoteFormData = {
  selectedCategory: 'cups',
  quantity: '1000',
  customQuantity: '',
  dimensions: '12oz (350ml)',
  material: 'Double-Wall Insulated Cup Board',
  finish: 'Full Color CMYK Offset Print',
  artworkStatus: 'ready',
  specialRequirements: '',
  fullName: '',
  businessName: '',
  phone: '',
  email: '',
  city: 'Karachi',
  additionalNotes: ''
};

/**
 * Generates an itemized, beautifully formatted WhatsApp inquiry message.
 */
export function formatWhatsAppQuoteMessage(data: QuoteFormData): string {
  const product = PRODUCT_OPTIONS.find(p => p.category === data.selectedCategory)?.title || data.selectedCategory;
  const qty = data.customQuantity ? `${data.customQuantity} units (Custom)` : `${data.quantity} units`;
  
  const lines = [
    `*UNITED IMPEX — CUSTOM PACKAGING QUOTE INQUIRY*`,
    `--------------------------------------------------`,
    `📦 *Product:* ${product}`,
    `📊 *Quantity:* ${qty}`,
    `📐 *Size / Capacity:* ${data.dimensions || 'Standard'}`,
    `📄 *Material:* ${data.material || 'To be recommended'}`,
    `🎨 *Printing & Finish:* ${data.finish || 'Standard offset'}`,
    `🖌️ *Artwork Readiness:* ${
      data.artworkStatus === 'ready' 
        ? 'Vector file ready (will attach in chat)' 
        : data.artworkStatus === 'need_design' 
          ? 'Need design & dieline assistance' 
          : 'Reordering existing design'
    }`,
    data.specialRequirements ? `📝 *Special Specs:* ${data.specialRequirements}` : null,
    `--------------------------------------------------`,
    `👤 *Client Name:* ${data.fullName}`,
    data.businessName ? `🏢 *Company / Brand:* ${data.businessName}` : null,
    `📞 *Phone / WhatsApp:* ${data.phone}`,
    data.email ? `✉️ *Email:* ${data.email}` : null,
    `📍 *Destination City:* ${data.city}`,
    data.additionalNotes ? `💬 *Additional Notes:* ${data.additionalNotes}` : null,
    `--------------------------------------------------`,
    `_Generated via United Impex Website Quotation Wizard_`
  ].filter(Boolean);

  return encodeURIComponent(lines.join('\n'));
}
