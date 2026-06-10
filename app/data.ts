export type Category = {
  title: string;
  image: string;
  icon: string;
  alt: string;
  active: boolean;
};

export type Rate = {
  name: string;
  price: string;
  time: string;
  description: string;
  images: string[];
  featured?: boolean;
};

export type WhyItem = {
  title: string;
  description: string;
  image: string;
};

export type CheckoutPhotoKey =
  | "front"
  | "back"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "interior"
  | "label_tag"
  | "serial_number"
  | "logo";

export type PhotoSlot = {
  key: CheckoutPhotoKey;
  label: string;
  description: string;
  image: string;
  required: boolean;
};

export type BrandTier = {
  label: string;
  brands: string[];
};

export const figma = {
  hero: "/figma/hero-luxury-bags.png",
  mark: "/figma/modacert-mark.png",
  cart: "/figma/cart.png",
  chat: "/figma/chat-widget.png",
  trustpilot: "/figma/trustpilot-white.png",
  footerMark: "/figma/footer-mark.png",
  ctaBag: "/figma/cta-bag.png",
  ctaWatch: "/figma/cta-watch.png",
  ctaShoe: "/figma/cta-shoe.png",
  creditCard: "/figma/why-payment-card.png",
  whyGlobal: "/figma/why-global.png",
  whyPayment: "/figma/why-payment-card.png",
  whyExpertPeople: "/figma/why-expert-bag.png",
  google: "/figma/google-g-logo.png",
};

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Authenticate", href: "/checkout" },
  { label: "Rates", href: "/rates" },
] as const;

export const categories: Category[] = [
  {
    title: "Handbags",
    image: "/figma/category-handbag.png",
    icon: "/figma/icon-shopping-bag.png",
    alt: "Luxury handbag authentication",
    active: true,
  },
  {
    title: "Clothing",
    image: "/figma/category-clothing-cropped.png",
    icon: "/figma/icon-tshirt.png",
    alt: "Luxury clothing authentication",
    active: true,
  },
  {
    title: "Watches",
    image: "/figma/category-watch.png",
    icon: "/landing/hero-watch.png",
    alt: "Luxury watch authentication",
    active: true,
  },
  {
    title: "Shoes",
    image: "/figma/shoes-lv-trainer-cropped.png",
    icon: "/figma/icon-sneaker.png",
    alt: "Luxury shoe authentication",
    active: true,
  },
  {
    title: "Jewelry",
    image: "/figma/category-jewelry.png",
    icon: "/figma/icon-jewelry.png",
    alt: "Luxury jewelry authentication",
    active: true,
  },
  {
    title: "Sneakers",
    image: "/figma/sneaker-air-jordan.png",
    icon: "/figma/icon-sneaker.png",
    alt: "Luxury sneaker authentication",
    active: true,
  },
  {
    title: "Eyewear",
    image: "/figma/rate-chanel-glasses.png",
    icon: "/figma/rate-chanel-glasses.png",
    alt: "Luxury eyewear authentication",
    active: true,
  },
  {
    title: "Accessories",
    image: "/figma/rate-hermes-orange-bag.png",
    icon: "/figma/icon-shopping-bag.png",
    alt: "Luxury accessory authentication",
    active: true,
  },
];

export const rates: Rate[] = [
  {
    name: "Louis Vuitton",
    price: "$20",
    time: "Result from 40 min",
    description: "Handbags, clothing, sneakers, watches, and accessories reviewed by specialist authenticators.",
    images: ["/figma/rate-lv-bag.png", "/figma/rate-lv-shirt.png", "/figma/category-sneaker.png"],
  },
  {
    name: "Chanel",
    price: "$20",
    time: "Double expert review",
    description: "Affordable luxury authentication with clear photo requirements and expert-backed decisions.",
    images: ["/figma/rate-chanel-bag.png", "/figma/rate-chanel-perfume.png", "/figma/rate-chanel-glasses.png"],
    featured: true,
  },
  {
    name: "Hermes",
    price: "$20",
    time: "Detailed notes",
    description: "Specialist review for premium leather, hardware, stamps, serial details, and construction.",
    images: ["/figma/rate-hermes-birkin.png", "/figma/rate-hermes-orange-bag.png"],
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
    brands: ["Supreme", "Bape", "Air Jordan", "Chrome Hearts", "Alexander Mcqueen", "Versace"],
  },
];

export const brands = [
  ...brandTiers[0].brands,
  "Other brands",
] as const;

export const acceptedPhotoMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
] as const;

export const acceptedPhotoInputTypes = acceptedPhotoMimeTypes.join(",");

export const checkoutPhotoSlots: PhotoSlot[] = [
  {
    key: "front",
    label: "Front view",
    description: "Full front side visible with clear lighting",
    image: "/figma/step-bag.png",
    required: true,
  },
  {
    key: "back",
    label: "Back view",
    description: "Full back side visible with clear lighting",
    image: "/figma/category-handbag.png",
    required: true,
  },
  {
    key: "left",
    label: "Left side",
    description: "Left side profile and edge details",
    image: "/figma/rate-lv-bag.png",
    required: true,
  },
  {
    key: "right",
    label: "Right side",
    description: "Right side profile and edge details",
    image: "/figma/rate-chanel-bag.png",
    required: true,
  },
  {
    key: "top",
    label: "Top view",
    description: "Top opening, handles, and upper construction",
    image: "/figma/rate-hermes-birkin.png",
    required: true,
  },
  {
    key: "bottom",
    label: "Bottom view",
    description: "Base, feet, soles, or lower construction",
    image: "/figma/rate-hermes-orange-bag.png",
    required: true,
  },
  {
    key: "interior",
    label: "Interior view",
    description: "Inside lining, pockets, and inner construction",
    image: "/figma/step-expert.png",
    required: true,
  },
  {
    key: "label_tag",
    label: "Label/tag",
    description: "Care label, size tag, or country of origin tag",
    image: "/figma/category-clothing.png",
    required: true,
  },
  {
    key: "serial_number",
    label: "Serial number",
    description: "Date code, serial, or product code clearly shown",
    image: "/figma/why-payment-card.png",
    required: true,
  },
  {
    key: "logo",
    label: "Brand logo",
    description: "Logo stamp, print, embossing, or hardware logo",
    image: "/figma/why-expert-bag.png",
    required: true,
  },
];

export const nfcPhotoSlots = checkoutPhotoSlots.slice(0, 3);
export const nonNfcPhotoSlots = checkoutPhotoSlots.slice(0, 6);
export const clothingPhotoSlots = checkoutPhotoSlots;

export const uploadRequirements = checkoutPhotoSlots.map((slot) => ({
  title: slot.label,
  description: slot.description,
  image: slot.image,
}));

export const steps = [
  { label: "Brand", href: "/checkout?step=brand" },
  { label: "Category", href: "/checkout?step=category" },
  { label: "NFC", href: "/checkout?step=nfc" },
  { label: "Photos", href: "/checkout?step=upload" },
  { label: "Payment", href: "/checkout?step=payment" },
  { label: "Done", href: "/checkout?step=done" },
] as const;

export const whyItems: WhyItem[] = [
  {
    title: "Global Service",
    description: "Our team can verify your items no matter where you are.",
    image: "/figma/why-global.png",
  },
  {
    title: "Affordable Pricing",
    description: "Designed for collectors and resellers, we make legit checks accessible.",
    image: "/figma/why-expert-bag.png",
  },
  {
    title: "Flexible Payments",
    description: "We support various payment methods to make your checkout seamless and secure.",
    image: "/figma/why-payment-card.png",
  },
  {
    title: "Expert Review",
    description: "Verified by real people who know the brands inside and out, combined with second expert for extra precision and 99% accuracy. No guesswork.",
    image: "/figma/icon-auth-comments.png",
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
    links: ["Authenticate now", "Business solutions", "Verify your certificate"],
  },
  {
    title: "Learn",
    links: ["Courses", "Real vs Fake guides", "Reseller guides", "Case studies", "Free authentication", "About", "Reviews"],
  },
  {
    title: "Legal",
    links: ["Terms of service", "Privacy policy", "Refund policy", "Sitemap"],
  },
  {
    title: "Help",
    links: ["Help Center", "Contact us"],
  },
] as const;

export const footerCategories = ["Handbags", "Clothing", "Shoes", "Jewelry", "Watches", "Eyewear"];

export const socialLinks = [
  { label: "Instagram", image: "/figma/social-instagram.png" },
  { label: "Facebook", image: "/figma/social-facebook.png" },
  { label: "YouTube", image: "/figma/social-youtube.png" },
  { label: "TikTok", image: "/figma/social-tiktok.png" },
  { label: "LinkedIn", image: "/figma/social-linkedin.png" },
  { label: "Email", image: "/figma/social-email.png" },
];

export const heroStats = trustStats.slice(0, 3);
