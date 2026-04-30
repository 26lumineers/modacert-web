export type Category = {
  title: string;
  image: string;
  alt: string;
  active: boolean;
};

export type Rate = {
  name: string;
  price: string;
  time: string;
  description: string;
  image: string;
  featured?: boolean;
};

export type WhyItem = {
  title: string;
  description: string;
  icon: "global" | "affordable" | "payment" | "expert";
};

export type PhotoSlot = {
  key: string;
  label: string;
  description: string;
  image: string;
};

export type BrandTier = {
  label: string;
  brands: string[];
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Authenticate", href: "/authenticate" },
  { label: "Sign In", href: "/signin" },
] as const;

export const categories: Category[] = [
  {
    title: "Handbags",
    image: "/landing/category-handbag.png",
    alt: "Luxury handbag authentication",
    active: true,
  },
  {
    title: "Clothing",
    image: "/landing/category-clothing.png",
    alt: "Luxury clothing authentication",
    active: true,
  },
  {
    title: "Sneaker",
    image: "/landing/category-shoe.png",
    alt: "Luxury sneaker authentication",
    active: true,
  },
  {
    title: "Watches",
    image: "/landing/category-watch.png",
    alt: "Luxury watch authentication",
    active: true,
  },
  {
    title: "Shoes",
    image: "/landing/hero-shoe.png",
    alt: "Luxury shoe authentication",
    active: true,
  },
  {
    title: "Jewelry",
    image: "/landing/category-jewelry.png",
    alt: "Luxury jewelry authentication",
    active: true,
  },
  {
    title: "Accessories",
    image: "/landing/service-bag.png",
    alt: "Luxury accessory authentication",
    active: true,
  },
  {
    title: "Eyewear",
    image: "/landing/why-expert.png",
    alt: "Luxury eyewear authentication",
    active: true,
  },
];

export const rates: Rate[] = [
  {
    name: "Essential Check",
    price: "$19.9",
    time: "Result from 40 min",
    description: "Single expert review for everyday resale and buyer confidence.",
    image: "/landing/category-handbag.png",
  },
  {
    name: "Priority Check",
    price: "$29.9",
    time: "Priority queue",
    description: "Double-verified by Two Experts for 99% accuracy at an affordable price.",
    image: "/landing/hero-bag.png",
    featured: true,
  },
  {
    name: "Deep Check",
    price: "Start from $20",
    time: "Detailed notes",
    description: "Extra close review for high-value items, serial marks, and hardware.",
    image: "/landing/service-bag.png",
  },
];

export const brandTiers: BrandTier[] = [
  {
    label: "All Brand",
    brands: [
      "Hermes",
      "Chanel",
      "Louis Vuitton",
      "Gucci",
      "Dior",
      "Saint Laurent",
      "Goyard",
      "Burberry",
      "Balenciaga",
      "Bvlgari",
      "Bottega Veneta",
      "Celine",
      "Chloe",
      "Delvaux",
      "Fendi",
      "Givenchy",
      "Issey Miyake",
      "Loewe",
      "Miu Miu",
      "Moynat",
      "Mcm",
      "Prada",
      "Ferragamo",
      "Vivienne Westwood",
      "Valentino",
      "Air Jordan",
      "Chrome Hearts",
      "Versace",
      "Supreme",
      "Alexander Mcqueen",
      "Bape",
    ],
  },
  {
    label: "Street Brand",
    brands: [
      "Supreme",
      "Bape",
      "Air Jordan",
      "Chrome Hearts",
      "Alexander Mcqueen",
      "Versace",
    ],
  },
];

export const brands = [
  "Louis Vuitton",
  "Chanel",
  "Hermes",
  "Gucci",
  "Dior",
  "Saint Laurent",
  "Goyard",
  "Burberry",
  "Balenciaga",
  "Bvlgari",
  "Bottega Veneta",
  "Celine",
  "Chloe",
  "Delvaux",
  "Fendi",
  "Givenchy",
  "Issey Miyake",
  "Loewe",
  "Miu Miu",
  "Moynat",
  "Mcm",
  "Prada",
  "Ferragamo",
  "Vivienne Westwood",
  "Valentino",
  "Air Jordan",
  "Chrome Hearts",
  "Versace",
  "Supreme",
  "Alexander Mcqueen",
  "Bape",
  "Other bags",
] as const;

export const nfcPhotoSlots: PhotoSlot[] = [
  {
    key: "nfc-main",
    label: "Main photo",
    description: "Full item visible, clear lighting",
    image: "/landing/category-handbag.png",
  },
  {
    key: "nfc-brand",
    label: "Brand Logo",
    description: "Logo or stamp in focus",
    image: "/landing/service-bag.png",
  },
  {
    key: "nfc-label",
    label: "Inside label",
    description: "Interior label and tags",
    image: "/landing/step-1.png",
  },
];

export const nonNfcPhotoSlots: PhotoSlot[] = [
  {
    key: "main-photo",
    label: "Main photo",
    description: "Full item visible, clear lighting",
    image: "/landing/category-handbag.png",
  },
  {
    key: "brand-logo",
    label: "Brand Logo",
    description: "Logo stamp or embossing",
    image: "/landing/service-bag.png",
  },
  {
    key: "inside-label",
    label: "Inside label",
    description: "Interior label and tags",
    image: "/landing/step-1.png",
  },
  {
    key: "hardware-engravings",
    label: "Hardware engravings",
    description: "Zippers, clasps, metal markings",
    image: "/landing/category-jewelry.png",
  },
  {
    key: "serial-number",
    label: "Serial number",
    description: "Date code or serial clearly shown",
    image: "/landing/step-2.png",
  },
  {
    key: "made-in-label",
    label: "Made in label",
    description: "Country and factory code",
    image: "/landing/step-3.png",
  },
];

export const clothingPhotoSlots: PhotoSlot[] = [
  {
    key: "clothing-main",
    label: "Main photo",
    description: "Full garment clearly visible",
    image: "/landing/category-clothing.png",
  },
  {
    key: "clothing-brand",
    label: "Brand Logo",
    description: "Logo label or tag",
    image: "/landing/service-bag.png",
  },
  {
    key: "clothing-label",
    label: "Inside label",
    description: "Care tag and sizing info",
    image: "/landing/step-1.png",
  },
  {
    key: "clothing-qr",
    label: "QR code label",
    description: "QR tag if present",
    image: "/landing/step-2.png",
  },
  {
    key: "clothing-zipper",
    label: "Zipper head (front)",
    description: "Zipper hardware close-up",
    image: "/landing/category-jewelry.png",
  },
  {
    key: "clothing-strap",
    label: "Shoulder strap clasp",
    description: "Strap attachment and hardware",
    image: "/landing/step-3.png",
  },
];

export const uploadRequirements = [
  {
    title: "Front view",
    description: "Full item shape, handles, and front logo area.",
    image: "/landing/category-handbag.png",
  },
  {
    title: "Back view",
    description: "Back stitching and structure in clear light.",
    image: "/landing/step-1.png",
  },
  {
    title: "Brand mark",
    description: "Logo, stamp, or heat embossing in focus.",
    image: "/landing/service-bag.png",
  },
  {
    title: "Hardware",
    description: "Zippers, clasps, chain, lock, and metal finishing.",
    image: "/landing/category-jewelry.png",
  },
  {
    title: "Interior",
    description: "Inside lining, pockets, date code, and serial marks.",
    image: "/landing/cta-bag.png",
  },
  {
    title: "Receipt or box",
    description: "Optional supporting packaging or purchase documents.",
    image: "/landing/service-collage.png",
  },
] as const;

export const steps = [
  { label: "Rates", href: "/rates" },
  { label: "Brand", href: "/brands" },
  { label: "Photos", href: "/authenticate" },
  { label: "Payment", href: "/payment" },
  { label: "Upload", href: "/upload" },
] as const;

export const whyItems: WhyItem[] = [
  {
    title: "Global Service",
    description:
      "Our team can verify your items no matter where you are.",
    icon: "global",
  },
  {
    title: "Affordable Pricing",
    description:
      "Designed for collectors and resellers, we make legit checks accessible.",
    icon: "affordable",
  },
  {
    title: "Flexible Payments",
    description:
      "We support various payment methods to make your checkout seamless and secure.",
    icon: "payment",
  },
  {
    title: "Expert Review",
    description:
      "Verified by real people who know the brands inside and out, combined with second expert for extra precision and 99% accuracy. No guesswork.",
    icon: "expert",
  },
];

export const trustStats = [
  { value: "100,000+", label: "Happy Customers" },
  { value: "500,000+", label: "Items Authenticated" },
  { value: "40+", label: "Brand" },
  { value: "100+", label: "World-class Specialists" },
];

export const footerColumns = [
  {
    title: "Authentication",
    links: [
      "Authenticate Now",
      "Courses",
      "Verify your certificate",
    ],
  },
  {
    title: "Business",
    links: [
      "Business solutions",
      "Real vs Fake guides",
      "Reseller guides",
      "Case studies",
      "Free authentication",
    ],
  },
  {
    title: "Learn",
    links: ["About", "Help Center", "Reviews", "Contact us"],
  },
  {
    title: "Legal",
    links: [
      "Terms of service",
      "Privacy policy",
      "Refund policy",
      "Sitemap",
    ],
  },
] as const;

export const footerCategories = [
  "Handbags",
  "Clothing",
  "Shoes",
  "Jewelry",
  "Watches",
  "Eyewear",
];

export const heroStats = [
  { value: "100,000+", label: "Happy Customers" },
  { value: "500,000+", label: "Items Authenticated" },
  { value: "40+", label: "Brand" },
];