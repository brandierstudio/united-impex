/**
 * United Impex — Manufacturing & Process Data & Asset Registry
 * 
 * Sourced according to Milestone 8 specifications:
 * - Temporary stock imagery is illustrative only (Commercial Offset Lithography & Packaging Finishing).
 * - Centralized asset configuration with photographer, license, and replacement instructions.
 * - Customer inquiry stages (not unverifiable factory machinery claims).
 */

export interface ProcessAssetMetadata {
  id: string;
  filename: string;
  localPath: string;
  label: string;
  role: 'cinematic-press' | 'stage-requirements' | 'stage-options' | 'stage-specs';
  originalSource: string;
  photographer: string;
  license: string;
  dimensions: string;
  replacementInstructions: string;
}

export interface ProcessStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  checkpoints: string[];
  imageId: string;
  imageAlt: string;
}

/**
 * Centralized Asset Metadata Configuration
 * 
 * Provides transparent tracking of stock/illustrative visual assets,
 * licensing terms, and clear handover instructions for the owner
 * when replacing with United Impex's official workshop photography.
 */
export const PROCESS_ASSET_REGISTRY: ProcessAssetMetadata[] = [
  {
    id: 'hero-press',
    filename: 'process-hero-press.webp',
    localPath: '/src/assets/process/process-hero-press.webp',
    label: 'Modern Commercial Offset Printing Press',
    role: 'cinematic-press',
    originalSource: 'https://commons.wikimedia.org/wiki/File:20240527_Speedmaster_XL_106-8-p_Plate_to_Unit_1.jpg',
    photographer: 'Heidelberger Druckmaschinen AG',
    license: 'CC BY-SA 4.0 (Creative Commons Attribution-ShareAlike 4.0)',
    dimensions: '1920x1080 (16:9)',
    replacementInstructions: 'Replace with 1920x1080 wide photograph of partner offset press in operation, or shop floor paper feeding unit.'
  },
  {
    id: 'stage-requirements',
    filename: 'process-stage-1-requirements.webp',
    localPath: '/src/assets/process/process-stage-1-requirements.webp',
    label: 'Technical Plate & Dieline Preparation',
    role: 'stage-requirements',
    originalSource: 'https://commons.wikimedia.org/wiki/File:Mounting_flexo_plate_on_tape_.jpg',
    photographer: 'Acheolg',
    license: 'CC BY-SA 4.0 (Creative Commons Attribution-ShareAlike 4.0)',
    dimensions: '1200x900 (4:3)',
    replacementInstructions: 'Replace with photograph of client packaging consultation, paper cup dieline blueprint, or digital artwork prep.'
  },
  {
    id: 'stage-options',
    filename: 'process-stage-2-options.webp',
    localPath: '/src/assets/process/process-stage-2-options.webp',
    label: 'Pantone Color Swatches & Substrate Selection',
    role: 'stage-options',
    originalSource: 'https://commons.wikimedia.org/wiki/File:Color_chips_2.jpg',
    photographer: 'Teemeah',
    license: 'CC BY-SA 3.0 (Creative Commons Attribution-ShareAlike 3.0)',
    dimensions: '1200x900 (4:3)',
    replacementInstructions: 'Replace with close-up photograph of United Impex paper swatches, kraft material samples, or foil stamp cards.'
  },
  {
    id: 'stage-specs',
    filename: 'process-stage-3-specs.webp',
    localPath: '/src/assets/process/process-stage-3-specs.webp',
    label: 'Packaging Carton Die-Cutting & Finishing',
    role: 'stage-specs',
    originalSource: 'https://commons.wikimedia.org/wiki/File:A_picture_shows_the_die_cutting_process.jpg',
    photographer: 'Acheolg',
    license: 'CC BY-SA 4.0 (Creative Commons Attribution-ShareAlike 4.0)',
    dimensions: '1200x900 (4:3)',
    replacementInstructions: 'Replace with macro photograph of finished folded cartons, cup rim curling, or final packaging quality check.'
  }
];

/**
 * The 3 Customer Inquiry Stages
 * Transparent, realistic stages of working with United Impex.
 */
export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'Discuss Your Requirements',
    subtitle: 'Dimensions, Volume & Structural Needs',
    description: 'Share your desired product format, quantity requirements, and target timeline. We review structural dielines, cup sizing, or box folding requirements to ensure technical print feasibility.',
    checkpoints: [
      'Structural dieline planning & cup oz / box sizing',
      'Volume tier assessment & turnaround guidance',
      'Artwork file compatibility check (AI, PDF, EPS)'
    ],
    imageId: 'stage-requirements',
    imageAlt: 'Prepress plate mounting and structural packaging preparation'
  },
  {
    step: '02',
    title: 'Explore Packaging & Print Options',
    subtitle: 'Substrates, Finishes & Color Systems',
    description: 'Select from virgin paperboard, natural kraft, double-wall beverage cup stock, or rigid boxboards. Choose full CMYK process printing or spot Pantone matching with matte, gloss, or foil finishes.',
    checkpoints: [
      'Material options: Natural kraft, white SBS, food-grade cup board',
      'Precision color matching with Pantone & CMYK proofing',
      'Surface finishes: Protective aqueous, matte, or gloss coatings'
    ],
    imageId: 'stage-options',
    imageAlt: 'Color chips, paperboard substrates, and print proofing swatches'
  },
  {
    step: '03',
    title: 'Confirm Specifications & Request a Quote',
    subtitle: 'Transparent Pricing & Production Approval',
    description: 'Review complete itemized specifications, finalize your artwork alignment, and receive a formal quotation with delivery schedules coordinated through our Karachi or Multan offices.',
    checkpoints: [
      'Transparent itemized quote with volume discounts',
      'Digital proof confirmation before production kickoff',
      'Direct order coordination via WhatsApp & phone'
    ],
    imageId: 'stage-specs',
    imageAlt: 'Packaging carton die-cutting and precision finishing'
  }
];

export const PROCESS_SECTION_CONTENT = {
  eyebrow: 'Printing & Packaging',
  heading: 'From Concept to Custom Packaging.',
  description: 'Whether launching a coffee brand, redesigning retail paper bags, or producing bespoke corporate packaging, United Impex manages commercial printing and fabrication with precision, premium paperboards, and verified color fidelity.',
  cinematicCaption: 'Illustrative packaging and printing imagery.',
  cinematicTitle: 'Commercial Offset & Packaging Finishing',
  cinematicSubtitle: 'High-speed multi-color printing presses and automated die-cutting enable consistent production runs across commercial packaging lines.',
  disclaimer: 'Illustrative packaging and printing imagery. Photographs demonstrate commercial offset printing techniques, paperboard substrates, and carton die-cutting processes. Tooling, materials, and production schedules are customized per client quotation.'
};
