/** Site-wide content. Career and Global Export sections intentionally excluded. */

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Operations', href: '#operations' },
] as const;

export const FOOTER_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Operations', href: '#operations' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Use', href: '#' },
] as const;

export type Product = {
  id: string;
  name: string;
  category: string;
};

export const PRODUCT_CATEGORIES = [
  'All',
  'Pyrexic',
  'Analgesic',
  'Gastrointestinal',
  'Antibiotic',
  'Anti-allergic',
  'Topical',
] as const;

export const PRODUCTS: Product[] = [
  { id: 'practel', name: 'PRACTEL', category: 'Pyrexic' },
  { id: 'ibuen', name: 'IBUEN', category: 'Analgesic' },
  { id: 'ashdol', name: 'ASHDOL', category: 'Analgesic' },
  { id: 'opa', name: 'OPA', category: 'Gastrointestinal' },
  { id: 'alodox', name: 'ALODOX', category: 'Antibiotic' },
  { id: 'ayacin', name: 'AYACIN', category: 'Antibiotic' },
  { id: 'azin', name: 'AZIN', category: 'Anti-allergic' },
  { id: 'ignocar', name: 'IGNOCAR', category: 'Topical' },
  { id: 'silvacar', name: 'SILVACAR', category: 'Topical' },
  { id: 'alafin', name: 'ALAFIN', category: 'Topical' },
  { id: 'p-don', name: 'P-DON', category: 'Topical' },
];

export type StatItem = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
};

export const STATS: StatItem[] = [
  {
    id: 'employees',
    value: 211,
    suffix: '+',
    label: 'Dedicated Employees',
    description: 'A skilled workforce across manufacturing, quality, and R&D.',
  },
  {
    id: 'formulations',
    value: 65,
    suffix: '+',
    label: 'Registered Formulations',
    description: 'A growing portfolio across multiple therapeutic categories.',
  },
  {
    id: 'molecules',
    value: 38,
    suffix: '+',
    label: 'Generic Molecules',
    description: 'Diverse active ingredients manufactured in-house.',
  },
];

export const DRAP_LOOKUP_URL = 'https://eapp.dra.gov.pk/WebProductIndex.php';

export const COMPANY = {
  name: 'Healthcare Pharmaceuticals',
  headOffice: '40 Km, Lahore Road, Multan, 66040, Pakistan',
  headOfficeMapsUrl: 'https://maps.app.goo.gl/cadMA2kNdQoDZwdJ6',
  plant: 'Industrial Estate Phase II, Pakistan',
  phone: '+92 304 1381382',
  phoneHref: 'tel:+923041381382',
  emails: {
    sales: 'sales@healthcarepk.online',
    info: 'info@healthcarepk.online',
    export: 'export@healthcarepk.online',
  },
};
