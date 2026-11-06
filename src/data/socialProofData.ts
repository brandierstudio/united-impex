/**
 * United Impex — Social Proof, Customer Reviews & Video Testimonials Data
 * 
 * Strict Compliance:
 * - Visibly labeled as sample/demo content.
 * - Centralized data store for straightforward owner updates.
 * - Zero fabricated real-person claims or deceptive review aggregations.
 */

export interface CustomerReview {
  id: string;
  authorName: string;
  authorRole: string;
  businessType: string;
  location: string;
  rating: number;
  reviewTitle: string;
  reviewText: string;
  productTag: string;
  orderType: string;
  date: string;
}

export interface VideoTestimonial {
  id: string;
  title: string;
  subtitle: string;
  speakerName: string;
  speakerRole: string;
  businessType: string;
  category: 'cups' | 'boxes' | 'bags' | 'diaries';
  durationBadge: string;
  posterId: string;
  hasRealVideo: boolean;
  videoSrc?: string;
  previewNote: string;
}

export const SOCIAL_PROOF_DISCLOSURE = {
  badge: 'Sample Testimonials &bull; Demo Content',
  shortNotice: 'Sample testimonials — demo content.',
  fullDisclaimer: 'Illustrative presentation only. The reviews, business names, and video cards displayed here are structured demo placeholders designed to showcase website typography, card layout, and video modal behavior. Verified client testimonials will be populated by United Impex upon formal collection.'
};

export const DEMO_CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    authorName: 'Zainab Tariq',
    authorRole: 'Brand Manager',
    businessType: 'Artisan Coffee Roasters',
    location: 'Lahore, Pakistan',
    rating: 5,
    reviewTitle: 'Exceptional Print Registration & Heat Retention',
    reviewText: 'We ordered custom 12oz double-wall paper cups for our three cafe locations. The vector logo reproduction was razor-sharp with no ink bleed, and the insulation kept beverages hot without requiring sleeves.',
    productTag: '12oz Double-Wall Cups',
    orderType: 'Commercial Beverage Print',
    date: 'Demo Review'
  },
  {
    id: 'rev-2',
    authorName: 'Hamza Siddiqui',
    authorRole: 'Operations Director',
    businessType: 'Boutique Apparel & Leather Goods',
    location: 'Karachi, Pakistan',
    rating: 5,
    reviewTitle: 'Rigid Presentation Boxes with Perfect Dielines',
    reviewText: 'The folding packaging boxes for our retail leather accessories arrived precisely cut to our custom dieline specifications. The matte lamination gives a premium tactile touch that our customers notice.',
    productTag: 'Custom Packaging Boxes',
    orderType: 'Retail Box Packaging',
    date: 'Demo Review'
  },
  {
    id: 'rev-3',
    authorName: 'Mariam Farooq',
    authorRole: 'Creative Director',
    businessType: 'Organic Bakery & Confectionery',
    location: 'Islamabad, Pakistan',
    rating: 5,
    reviewTitle: 'Sturdy Natural Kraft Bags with Rich Inks',
    reviewText: 'Our twisted handle shopping bags required heavy-gauge kraft paper to handle packaged baked goods. United Impex matched our brand color accurately, and the handle joints are exceptionally durable.',
    productTag: 'Twisted Handle Kraft Bags',
    orderType: 'Eco Shopping Bags',
    date: 'Demo Review'
  },
  {
    id: 'rev-4',
    authorName: 'Bilal Mansoor',
    authorRole: 'Corporate Communications',
    businessType: 'Financial Advisory Group',
    location: 'Multan, Pakistan',
    rating: 5,
    reviewTitle: 'Executive Hardbound Notebooks for Annual Summit',
    reviewText: 'United Impex coordinated our annual corporate planners with gold foil debossing on navy leatherette. The paper smoothness and binding quality met our executive board’s highest expectations.',
    productTag: 'Executive Corporate Diaries',
    orderType: 'Corporate Stationery',
    date: 'Demo Review'
  }
];

export const DEMO_VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: 'vid-cups',
    title: 'Custom Coffee Cup Branding',
    subtitle: 'High-Volume Commercial Cafe Packaging',
    speakerName: 'Specialty Cafe Partner',
    speakerRole: 'Beverage Packaging Spotlight',
    businessType: 'Artisan Coffee Chain',
    category: 'cups',
    durationBadge: '0:48',
    posterId: 'cups',
    hasRealVideo: false,
    previewNote: 'Demo preview — video coming soon'
  },
  {
    id: 'vid-boxes',
    title: 'Rigid Retail Box Production',
    subtitle: 'Custom Folding Cartons & Mailers',
    speakerName: 'Lifestyle Retail Partner',
    speakerRole: 'E-Commerce Packaging Spotlight',
    businessType: 'Apparel & Accessories',
    category: 'boxes',
    durationBadge: '1:14',
    posterId: 'boxes',
    hasRealVideo: false,
    previewNote: 'Demo preview — video coming soon'
  },
  {
    id: 'vid-bags',
    title: 'Eco-Friendly Kraft Bags',
    subtitle: 'Twisted Handle Boutique Carrier Bags',
    speakerName: 'Confectionery & Bakery Partner',
    speakerRole: 'Retail Shopping Bag Spotlight',
    businessType: 'Gourmet Food Boutique',
    category: 'bags',
    durationBadge: '0:56',
    posterId: 'bags',
    hasRealVideo: false,
    previewNote: 'Demo preview — video coming soon'
  }
];
