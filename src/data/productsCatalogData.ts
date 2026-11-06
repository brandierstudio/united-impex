import cupImg from '../assets/animation/cup.png';
import cupPhoto1 from '../assets/products/cups/Product_photograph_for_United_Impex_00ad6975.jpg';
import cupPhoto2 from '../assets/products/cups/Cup_commercial_photography_143d208e.jpg';
import cupPhoto3 from '../assets/products/cups/Macro_product_photography_printi_66788af5.jpg';

import boxImg from '../assets/products/boxes/Product_commercial_photography_s_470ccf75.jpg';
import boxPhoto2 from '../assets/products/boxes/Commercial_product_photography_o_87838bb6.jpg';
import boxPhoto3 from '../assets/products/boxes/Commercial_product_photography_s_9f12d32b.jpg';

import bagImg from '../assets/products/bags/Product_photography_in_studio_5e308475.jpg';
import bagPhoto2 from '../assets/products/bags/Commercial_product_photography_o_e3a0b08e.jpg';
import bagPhoto3 from '../assets/products/bags/Macro_commercial_product_photogr_49f30bd6.jpg';

import diaryImg from '../assets/products/diaries/Product_photograph_in_studio_81f03e4a.jpg';
import diaryPhoto2 from '../assets/products/diaries/Commercial_product_photography_c_39f3489c.jpg';
import diaryPhoto3 from '../assets/products/diaries/Commercial_packaging_product_pho_109b4e91.jpg';

import blankCupWebp from '../assets/customizer/blank-cup.webp';
import blankBoxWebp from '../assets/customizer/blank-box.webp';
import blankBagWebp from '../assets/customizer/blank-bag.webp';
import blankDiaryWebp from '../assets/customizer/blank-diary.webp';
import type { CustomizerCategory } from '../components/customizer/ProductCustomizerModal';

export interface GalleryItem {
  id: string;
  image: string;
  title: string;
  caption: string;
}

export interface ProductVariation {
  name: string;
  options: string[];
}

export interface ProductCatalogItem {
  id: string;
  slug: string;
  aliasSlugs: string[];
  customizerCategory: CustomizerCategory;
  title: string;
  badge: string;
  shortDesc: string;
  longDesc: string;
  heroImage: string;
  mockupImage: string;
  gallery: GalleryItem[];
  variations: ProductVariation[];
  sizes: string[];
  materials: string[];
  finishes: string[];
  specs: {
    boardGrade: string;
    printing: string;
    finishing: string;
    moq: string;
    leadTime: string;
    compliance: string;
  };
  features: string[];
}

export const PRODUCTS_CATALOG: ProductCatalogItem[] = [
  {
    id: 'coffee-cups',
    slug: 'coffee-cups',
    aliasSlugs: ['cups', 'disposable-coffee-cups'],
    customizerCategory: 'cups',
    title: 'Custom Printed Coffee Cups',
    badge: 'Drinkware & Disposables',
    shortDesc: 'Single wall, double wall, and ripple insulated food-grade cups with precision snap lids.',
    longDesc: 'Engineered for specialty cafes, corporate events, and beverage hospitality. Our custom paper cups are manufactured from heavy virgin food-grade paperboard lined with food-safe PE or PLA barrier layers. Featuring airtight ultrasonic side-seam welds, smooth rolled rims, and tight-snap lids that prevent drips and spills.',
    heroImage: cupImg,
    mockupImage: blankCupWebp,
    gallery: [
      {
        id: 'cup-hero',
        image: cupImg,
        title: 'Studio Signature Cup',
        caption: 'Double-wall insulated paper cup with matte soft-touch finish and precision snap lid.'
      },
      {
        id: 'cup-photo-1',
        image: cupPhoto1,
        title: 'Commercial Drinkware Sample',
        caption: 'High-density food-grade paperboard printed with vibrant food-safe offset inks.'
      },
      {
        id: 'cup-photo-2',
        image: cupPhoto2,
        title: 'Multi-Size Range',
        caption: 'Available across 4 oz espresso, 8 oz flat white, 12 oz regular, and 16 oz large volumes.'
      },
      {
        id: 'cup-photo-3',
        image: cupPhoto3,
        title: 'Rim & Seam Macro Detail',
        caption: 'Ultrasonic seam welding and smooth rolled rim ensuring 100% leak-proof lid engagement.'
      }
    ],
    variations: [
      {
        name: 'Insulation Construction',
        options: ['Single Wall (Standard)', 'Double Wall (Insulated)', 'Ripple Wall (Heat Shield)']
      },
      {
        name: 'Lid Specification',
        options: ['White Sip-Through Lid', 'Black Sip-Through Lid', 'Compostable PLA Lid']
      }
    ],
    sizes: ['4 oz (Espresso)', '8 oz (Standard Flat White)', '12 oz (Regular Latte)', '16 oz (Large Brew)'],
    materials: [
      'Food-grade Virgin Paperboard (280–350 GSM)',
      'Double-Wall Insulated Air Pocket Layer',
      'PE / PLA Eco Compostable Barrier Coating',
      'Food-Safe Certified Inks'
    ],
    finishes: [
      'Matte Soft-Touch Finish',
      'High-Gloss Vibrant Print',
      'Metallic Gold / Silver Foil Stamp',
      'Embossed Brand Texturing'
    ],
    specs: {
      boardGrade: '280–350 GSM Virgin Food Board',
      printing: 'Full Color 4-Color CMYK Offset + Spot Pantone',
      finishing: 'Matte, Gloss, Metallic Foil Accent',
      moq: '1,000 units',
      leadTime: '5 – 7 business days',
      compliance: 'Food Safety Tested & Contact Safe'
    },
    features: [
      'Double-wall thermal insulation eliminates the need for paper sleeves',
      'Airtight rolled rim guarantees leak-free lid engagement',
      'Odorless, non-tainting food-grade certified coatings',
      'Full 360-degree cylindrical custom graphic imprint'
    ]
  },
  {
    id: 'packaging-boxes',
    slug: 'packaging-boxes',
    aliasSlugs: ['boxes', 'packaging-box', 'cartons'],
    customizerCategory: 'boxes',
    title: 'Custom Packaging & Folding Boxes',
    badge: 'Retail & Luxury Cartons',
    shortDesc: 'Rigid setup presentation boxes, folding product cartons, and custom retail presentation packaging.',
    longDesc: 'Precision-manufactured commercial packaging designed for cosmetics, electronics, apparel, and corporate presentation. Built with structural dieline accuracy using high-caliper bleached SBS board or rigid greyboard wrapped in art paper. Offers magnetic snap closures, custom die-cut foam/paper inserts, and razor-sharp folding lines.',
    heroImage: boxImg,
    mockupImage: blankBoxWebp,
    gallery: [
      {
        id: 'box-hero',
        image: boxImg,
        title: 'Luxury Rigid Presentation Box',
        caption: 'High-caliper greyboard wrapped in smooth matte-laminated art paper with magnetic closure.'
      },
      {
        id: 'box-photo-2',
        image: boxPhoto2,
        title: 'Folding Retail Cartons',
        caption: 'Tuck-end folding cartons precision die-cut with razor-sharp creasing lines for easy assembly.'
      },
      {
        id: 'box-photo-3',
        image: boxPhoto3,
        title: 'Product Packaging Sample',
        caption: 'Vivid multi-color offset print with spot UV gloss accents and foil-embossed logo stamping.'
      }
    ],
    variations: [
      {
        name: 'Box Architecture',
        options: ['Folding Tuck-End Carton', 'Rigid Magnetic Lid Box', 'Drawer / Matchbox Sleeve', 'Corrugated Mailer']
      },
      {
        name: 'Interior Insert',
        options: ['Cardboard Divider', 'Custom Cut Foam / EVA', 'Velvet-Flocked Tray', 'No Insert']
      }
    ],
    sizes: ['Custom Dielines (Tailored to Product Width × Depth × Height)', 'Tuck-End Product Carton', 'Rigid Magnetic Lid Box', 'Drawer / Sleeve Box'],
    materials: [
      'Bleached Sulfate SBS Board (300–450 GSM)',
      'Rigid Greyboard (1.5mm – 3.0mm thickness)',
      'Coated Art Paper Wrap (157 GSM)',
      'Kraft Corrugated Fluting (E-Flute, B-Flute)'
    ],
    finishes: [
      'Velvet Matte / Gloss Lamination',
      'Precision Spot UV Gloss Highlighting',
      'Hot Foil Stamping (Gold, Rose Gold, Silver)',
      'Blind Debossing & Multi-Level Embossing'
    ],
    specs: {
      boardGrade: '350–450 GSM SBS / 2.0mm Rigid Greyboard',
      printing: 'High-Precision Commercial Offset Print',
      finishing: 'Soft-Touch Matte, Spot UV, Metallic Foil',
      moq: '500 units',
      leadTime: '7 – 10 business days',
      compliance: 'Drop-Tested & Structural Structural Integrity'
    },
    features: [
      'Structural dieline consultation and custom sample proofs',
      'Razor-sharp die-cutting ensures effortless flat-pack assembly',
      'Reinforced corners withstand shipping and retail stacking',
      'Optional custom interior foam or velvet molded inserts'
    ]
  },
  {
    id: 'paper-bags',
    slug: 'paper-bags',
    aliasSlugs: ['bags', 'shopping-bags', 'kraft-bags'],
    customizerCategory: 'bags',
    title: 'Luxury Kraft & Art Paper Bags',
    badge: 'Retail Carryware',
    shortDesc: 'Eco-conscious retail shopping bags manufactured with reinforced twisted paper, ribbon, or cotton cord handles.',
    longDesc: 'Crafted from high-tensile virgin kraft paper or coated luxury art board. Our shopping carry bags feature reinforced cardboard turn-top cuffs and bottom gussets engineered to hold heavy merchandise securely without tearing. Ideal for high-end fashion boutiques, bakeries, cafes, and corporate brand presentations.',
    heroImage: bagImg,
    mockupImage: blankBagWebp,
    gallery: [
      {
        id: 'bag-hero',
        image: bagImg,
        title: 'Studio Luxury Paper Bag',
        caption: 'Heavy virgin natural kraft shopping tote with reinforced twisted paper handles.'
      },
      {
        id: 'bag-photo-2',
        image: bagPhoto2,
        title: 'Retail Shopping Carryware',
        caption: 'High-strength bottom gusset supporting retail merchandise payloads with crisp brand imprint.'
      },
      {
        id: 'bag-photo-3',
        image: bagPhoto3,
        title: 'Handle & Turn-Top Detail',
        caption: 'Reinforced internal turnover card prevents handle tear-out under heavy payloads.'
      }
    ],
    variations: [
      {
        name: 'Handle Material',
        options: ['Twisted Kraft Paper', 'Braided Cotton Rope', 'Satin Ribbon Handle', 'Die-Cut Patch Handle']
      },
      {
        name: 'Paper Substrate',
        options: ['Natural Brown Virgin Kraft', 'Bleached White Kraft', 'Coated Art Board']
      }
    ],
    sizes: ['Small (18 × 22 × 8 cm)', 'Medium (26 × 32 × 10 cm)', 'Large (32 × 42 × 12 cm)', 'Bespoke Custom Dimensions'],
    materials: [
      'Pure Natural Brown Virgin Kraft (120–180 GSM)',
      'Bleached White Kraft Paper (140–180 GSM)',
      'Coated C2S Art Paper (200–250 GSM)',
      'Twisted Paper, Cotton Rope, or Satin Ribbon Handles'
    ],
    finishes: [
      'Raw Natural Texture (Eco-friendly touch)',
      'Matte or Gloss Film Lamination',
      'Precision Hot Foil Stamping',
      'Two-Sided Offset / Flexographic Print'
    ],
    specs: {
      boardGrade: '140–250 GSM High-Tensile Paper',
      printing: 'Flexographic / Offset Spot & Full Color',
      finishing: 'Matte Lamination, Hot Foil, Die-Cut Handles',
      moq: '500 units',
      leadTime: '6 – 8 business days',
      compliance: '100% Recyclable & Biodegradable Paper'
    },
    features: [
      'Reinforced bottom gusset board supports up to 8 kg payload',
      'Comfortable hand-applied twisted or woven cotton handles',
      'Sharp edge creasing prevents collapsing during packing',
      'Eco-conscious biodegradable adhesives and water-based inks'
    ]
  },
  {
    id: 'diaries-notebooks',
    slug: 'diaries-notebooks',
    aliasSlugs: ['diaries', 'notebooks', 'corporate-diaries'],
    customizerCategory: 'diaries',
    title: 'Corporate Diaries & Executive Planners',
    badge: 'Stationery & Executive Gifts',
    shortDesc: 'Hardbound, softcover, and debossed leatherette executive notebooks, planners, and corporate desk stationery.',
    longDesc: 'Handcrafted executive corporate diaries and annual planners designed to convey institutional prestige. Features durable casebound hardcovers wrapped in thermo-PU vegan leatherette, textured linen bookcloth, or custom printed jacket boards. Internally bound with thread-sewn section binding and acid-free cream writing paper that resists ink bleed-through.',
    heroImage: diaryImg,
    mockupImage: blankDiaryWebp,
    gallery: [
      {
        id: 'diary-hero',
        image: diaryImg,
        title: 'Executive Hardbound Planner',
        caption: 'Thread-sewn section binding allowing 180° flat opening on executive desks.'
      },
      {
        id: 'diary-photo-2',
        image: diaryPhoto2,
        title: 'Debossed Leatherette Cover',
        caption: 'Thermo-reactive PU leatherette with crisp blind heat debossed corporate monogram.'
      },
      {
        id: 'diary-photo-3',
        image: diaryPhoto3,
        title: 'Corporate Desk Stationery Set',
        caption: 'Complete executive ensemble with custom ribbon bookmark and gilded page edges.'
      }
    ],
    variations: [
      {
        name: 'Cover Material',
        options: ['Thermo-PU Leatherette', 'Textured Linen Bookcloth', 'Hardcover Laminated Print']
      },
      {
        name: 'Internal Ruling',
        options: ['Lined Writing Paper', 'Blank Sketching Pages', 'Corporate Calendar & Daily Planner']
      }
    ],
    sizes: ['A5 (14.8 × 21.0 cm)', 'B5 Executive (17.6 × 25.0 cm)', 'A4 Desk Planner (21.0 × 29.7 cm)'],
    materials: [
      'Thermo-Reactive Vegan Leatherette (PU)',
      'Woven Bookcloth Linen Spine / Cover',
      'Acid-Free Cream Writing Paper (80–100 GSM)',
      'Casebound 2.5mm Rigid Book Board'
    ],
    finishes: [
      'Deep Blind Heat Debossing (Color-changing effect)',
      'Gold / Silver / Copper Metallic Foil Stamping',
      'Custom Printed Full-Color Endpapers',
      'Gilded Metallic Paper Edges'
    ],
    specs: {
      boardGrade: '80–100 GSM Cream Paper / 2.5mm Board',
      printing: 'Thread-Sewn Section Binding (Opens flat 180°)',
      finishing: 'Heat Deboss, Gold Foil, Satin Ribbon Marker',
      moq: '250 units',
      leadTime: '5 – 8 business days',
      compliance: 'Acid-Free Archival Paper'
    },
    features: [
      'Thread-sewn binding allows book to lay completely flat on desks',
      'Silk ribbon bookmark with optional elastic closure band',
      'Custom corporate tip-in profile pages for company milestones',
      'Expandable back gusset pocket for business cards and notes'
    ]
  }
];

export const getProductBySlug = (slug: string): ProductCatalogItem | undefined => {
  const clean = slug.toLowerCase().trim();
  return PRODUCTS_CATALOG.find(
    p => p.slug === clean || p.aliasSlugs.includes(clean)
  );
};
