export interface ServiceDetail {
  slug: string;
  title: string;
  category: "lawn-care" | "exterior-cleaning";
  categoryLabel: string;
  shortDescription: string;
  heroImage: string;
  description: string[];
  includes?: {
    label: string;
    items: string[];
  }[];
  additionalInfo?: string;
  relatedSlugs: string[];
}

export const services: ServiceDetail[] = [
  {
    slug: "weekly-lawn-mowing",
    title: "Weekly Lawn Mowing",
    category: "lawn-care",
    categoryLabel: "Lawn Care & Landscaping",
    shortDescription:
      "Keep your lawn healthy and well maintained all season with mowing, edge trimming, and blowing off sidewalks and driveways.",
    heroImage: "/img-mower.jpeg",
    description: [
      "A consistently cut lawn is the foundation of a well kept property. Our weekly mowing service keeps your yard looking sharp all season, so you never have to think about it.",
      "We show up on a set schedule, cut to the right height for your grass type, trim the edges clean, and blow off your sidewalks and driveway before we leave. No contracts, no commitments. Just reliable service, week after week.",
    ],
    includes: [
      {
        label: "Services include",
        items: [
          "Lawn mowing",
          "Edge trimming",
          "Blowing off sidewalks and driveways",
        ],
      },
    ],
    relatedSlugs: ["spring-fall-clean-ups", "hedge-trimming", "weed-control"],
  },
  {
    slug: "spring-fall-clean-ups",
    title: "Spring & Fall Clean Ups",
    category: "lawn-care",
    categoryLabel: "Lawn Care & Landscaping",
    shortDescription:
      "Seasonal clean-ups including aeration, power raking, leaf removal, and fertilization to improve lawn health.",
    heroImage: "/img-fall-cleanup.jpg",
    description: [
      "Calgary winters are hard on lawns. Spring clean-ups clear the debris, break up compacted soil, and set your yard up for healthy growth. Fall clean-ups do the opposite, removing leaves and preparing your lawn to survive another winter.",
      "We handle all the seasonal work that makes the difference between a lawn that struggles and one that thrives. Aeration opens up the soil. Power raking pulls out dead thatch. Fertilization feeds the roots. It all adds up to a healthier, greener yard.",
    ],
    includes: [
      {
        label: "Spring and fall services include",
        items: [
          "Aeration",
          "Power raking",
          "Leaf clean up",
          "Fertilization",
        ],
      },
    ],
    relatedSlugs: ["weekly-lawn-mowing", "weed-control", "landscaping"],
  },
  {
    slug: "landscaping",
    title: "Landscaping",
    category: "lawn-care",
    categoryLabel: "Lawn Care & Landscaping",
    shortDescription:
      "Hardscape and softscape services: patios, walkways, retaining walls, sod installation, garden beds, and planting.",
    heroImage: "/img-hardscape-aerial.jpeg",
    description: [
      "Whether you want a new patio for entertaining, a walkway that actually looks intentional, or garden beds that bring your yard to life, we handle the full project from design through to completion.",
      "We work with both hardscape and softscape. That means stone, pavers, and retaining walls on one side, and sod, mulch, plantings, and garden beds on the other. Most of our clients want a combination of both, and we are set up to deliver that as one seamless project.",
    ],
    includes: [
      {
        label: "Hardscape",
        items: [
          "Patios",
          "Walkways",
          "Retaining walls",
          "Stone features",
        ],
      },
      {
        label: "Softscape",
        items: [
          "Sod installation",
          "Garden beds",
          "Mulch installation",
          "Planting",
        ],
      },
    ],
    relatedSlugs: ["spring-fall-clean-ups", "hedge-trimming", "driveway-sealing"],
  },
  {
    slug: "hedge-trimming",
    title: "Hedge Trimming",
    category: "lawn-care",
    categoryLabel: "Lawn Care & Landscaping",
    shortDescription:
      "Professional trimming and shaping of hedges and shrubs to keep your property looking clean and maintained.",
    heroImage: "/img-trimmer-v2.jpeg",
    description: [
      "Overgrown hedges can make even the nicest property look neglected. Regular trimming keeps everything clean, shaped, and under control.",
      "We work with all types of hedges and shrubs, shaping them to your preference and cleaning up every clipping when the job is done. Most clients pair this with weekly mowing to keep the entire property looking its best.",
    ],
    includes: [
      {
        label: "Includes",
        items: [
          "Hedge shaping",
          "Shrub trimming",
          "Removal of clippings",
        ],
      },
    ],
    relatedSlugs: ["weekly-lawn-mowing", "landscaping", "weed-control"],
  },
  {
    slug: "weed-control",
    title: "Weed Control",
    category: "lawn-care",
    categoryLabel: "Lawn Care & Landscaping",
    shortDescription:
      "Weed control treatments to help keep lawns and garden beds healthy and free of unwanted weeds.",
    heroImage: "/img-fertilization.jpeg",
    description: [
      "Weeds compete with your grass for water, nutrients, and sunlight. Left unchecked, they take over. Our weed control treatments target the problem at the root and help your lawn stay thick and healthy.",
      "We treat both lawns and garden beds, using the right products for Calgary's climate and soil conditions. Treatments are timed throughout the season to stay ahead of new growth, not just react to what is already there.",
    ],
    relatedSlugs: ["weekly-lawn-mowing", "spring-fall-clean-ups", "landscaping"],
  },
  {
    slug: "driveway-sealing",
    title: "Driveway Sealing",
    category: "exterior-cleaning",
    categoryLabel: "Exterior Cleaning Services",
    shortDescription:
      "Clear coat sealing for exposed aggregate driveways to protect the surface and enhance appearance.",
    heroImage: "/img-driveway-sealing.jpg",
    description: [
      "Calgary's freeze and thaw cycles and road salt take a toll on exposed aggregate driveways. Sealing protects the surface from moisture, UV damage, and general wear, keeping it looking fresh for years.",
      "We apply a high quality clear coat sealant designed specifically for exposed aggregate. The result is a clean, glossy finish that brings out the natural stone and protects your investment.",
    ],
    relatedSlugs: ["window-cleaning", "gutter-cleaning", "pressure-washing"],
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    category: "exterior-cleaning",
    categoryLabel: "Exterior Cleaning Services",
    shortDescription:
      "Professional window cleaning for a streak-free finish that improves the appearance of your home.",
    heroImage: "/img-window-cleaning-v2.jpeg",
    description: [
      "Clean windows make a noticeable difference to how your home looks from the street and how much natural light comes inside. We clean both interior and exterior windows, including hard to reach second story glass.",
      "Frames and sills are wiped down as part of every job. No streaks, no residue, just clear glass and a home that looks well cared for.",
    ],
    relatedSlugs: ["gutter-cleaning", "driveway-sealing", "pressure-washing"],
  },
  {
    slug: "gutter-cleaning",
    title: "Gutter Cleaning",
    category: "exterior-cleaning",
    categoryLabel: "Exterior Cleaning Services",
    shortDescription:
      "Removal of leaves and debris from gutters and downspouts to prevent blockages and water damage.",
    heroImage: "/img-gutter-cleaning.png",
    description: [
      "Clogged gutters lead to water overflow, foundation damage, and ice dams in the winter. Regular cleaning prevents all of that and keeps water flowing where it should.",
      "We clear all leaves and debris from your gutters and downspouts, flush them to confirm proper drainage, and flag any damage or areas of concern. We recommend cleaning at least twice a year, once in spring and once in fall.",
    ],
    relatedSlugs: ["window-cleaning", "driveway-sealing", "pressure-washing"],
  },
  {
    slug: "pressure-washing",
    title: "Pressure Washing",
    category: "exterior-cleaning",
    categoryLabel: "Exterior Cleaning Services",
    shortDescription:
      "Professional pressure washing for driveways, sidewalks, patios, and exterior surfaces to remove built-up dirt and grime.",
    heroImage: "/img-pressure-washing.png",
    description: [
      "Professional pressure washing to restore the look of your driveways, sidewalks, patios, decks, and other exterior surfaces. Over time, dirt, algae, mold, and general grime build up and make surfaces look worn and neglected.",
      "Our pressure washing service removes years of buildup safely and effectively, bringing surfaces back to life without damaging the material underneath. We adjust pressure levels depending on the surface to ensure a thorough clean without causing harm.",
    ],
    relatedSlugs: ["driveway-sealing", "window-cleaning", "gutter-cleaning"],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServicesByCategory(
  category: "lawn-care" | "exterior-cleaning"
): ServiceDetail[] {
  return services.filter((s) => s.category === category);
}

export function getRelatedServices(service: ServiceDetail): ServiceDetail[] {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is ServiceDetail => s !== undefined);
}

export interface CategoryData {
  slug: "lawn-care" | "exterior-cleaning";
  title: string;
  shortTitle: string;
  description: string;
  heroImage: string;
  features: string[];
}

export const categoryData: CategoryData[] = [
  {
    slug: "lawn-care",
    title: "Lawn Care & Landscaping",
    shortTitle: "Lawn Care",
    description:
      "From weekly mowing and seasonal clean-ups to full landscaping projects. We keep your yard healthy, green, and looking its best all season long.",
    heroImage: "/img-lawncare-header.png",
    features: [
      "Weekly lawn maintenance",
      "Seasonal clean-ups & fertilization",
      "Landscaping & hardscaping",
      "Hedge trimming & shaping",
      "Weed control treatments",
    ],
  },
  {
    slug: "exterior-cleaning",
    title: "Exterior Cleaning Services",
    shortTitle: "Exterior Cleaning",
    description:
      "Keep the outside of your home looking its best with professional window cleaning, gutter cleaning, and driveway sealing. All handled by one team.",
    heroImage: "/img-exterior-header.png",
    features: [
      "Exposed aggregate driveway sealing",
      "Streak-free window cleaning",
      "Gutter & downspout clearing",
      "Professional pressure washing",
    ],
  },
];

export function getCategoryData(
  slug: "lawn-care" | "exterior-cleaning"
): CategoryData | undefined {
  return categoryData.find((c) => c.slug === slug);
}

export const serviceArea = {
  title: "Service Area",
  description:
    "Temple Landscaping & Exterior Services proudly serves Calgary, Alberta. We provide services across all areas of the city.",
  areas: [
    "Northeast Calgary",
    "Northwest Calgary",
    "Southeast Calgary",
    "Southwest Calgary",
  ],
};
