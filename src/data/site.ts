// Centralized site data so components stay declarative and easy to maintain.

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Global Operation', href: '#global-operation' },
  { label: 'Career', href: '#career' },
] as const;

export type StatItem = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  icon: 'users' | 'pill' | 'flask' | 'globe';
};

export const STATS: StatItem[] = [
  {
    id: 'employees',
    value: 7800,
    suffix: '+',
    label: 'Employees',
    description: 'Dedicated professionals driving pharmaceutical excellence worldwide.',
    icon: 'users',
  },
  {
    id: 'medicines',
    value: 630,
    suffix: '+',
    label: 'Registered Medicine',
    description: 'GMP-registered formulations across major therapeutic categories.',
    icon: 'pill',
  },
  {
    id: 'generics',
    value: 270,
    suffix: '+',
    label: 'Generic',
    description: 'Generic molecules manufactured to international standards.',
    icon: 'flask',
  },
  {
    id: 'countries',
    value: 32,
    suffix: '+',
    label: 'Countries Export',
    description: 'Trusted supply across Asia, Africa, and emerging markets.',
    icon: 'globe',
  },
];

export type Product = {
  id: string;
  name: string;
  category: string;
  form?: string;
  strength?: string;
  description?: string;
  tag?: 'flagship' | 'new';
};

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

export const PRODUCT_CATEGORIES = [
  'All',
  'Pyrexic',
  'Analgesic',
  'Gastrointestinal',
  'Antibiotic',
  'Anti-allergic',
  'Topical',
] as const;

export type Leader = {
  id: string;
  name: string;
  title: string;
  bio: string;
};

export const LEADERS: Leader[] = [
  {
    id: 'ceo',
    name: 'Mr. A. Rahman',
    title: 'Managing Director & CEO',
    bio: 'Leading Healthcare Pharmaceuticals for over two decades with a commitment to quality, access, and global expansion across regulated and emerging markets.',
  },
  {
    id: 'coo',
    name: 'Dr. S. Mahmood',
    title: 'Chief Operating Officer',
    bio: 'Overseeing a state-of-the-art manufacturing network and a workforce of 7,800+ committed to delivering life-saving medicines on schedule.',
  },
  {
    id: 'qa',
    name: 'Dr. N. Akhtar',
    title: 'Director, Quality Assurance',
    bio: 'Guardian of our GMP, WHO-GDMP, and ISO certifications — ensuring every batch meets the standards of the 32+ countries we serve.',
  },
];

export const CONTACTS = {
  headOffice: {
    title: 'Head Office',
    lines: ['House 12, Road 7, Gulshan-1', 'Dhaka 1212, Bangladesh'],
    phone: '+880 2 9870 1234',
    email: 'info@healthcarepk.online',
  },
  plant: {
    title: 'Manufacturing Plant',
    lines: ['Dhamair Char, Narayanganj', 'Industrial Zone, Bangladesh'],
    phone: '+880 2 7654 3210',
    email: 'plant@healthcarepk.online',
  },
  usContact: {
    title: 'U.S. Contact',
    lines: ['450 Technology Square, Suite 300', 'Cambridge, MA 02139, USA'],
    phone: '+1 (617) 555 0142',
    email: 'usa@healthcarepk.online',
  },
};

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
] as const;
