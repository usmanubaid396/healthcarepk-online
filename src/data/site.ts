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
  form: string;
  strength: string;
  description: string;
  tag?: 'flagship' | 'new';
};

export const PRODUCTS: Product[] = [
  {
    id: 'felitan',
    name: 'Felitan',
    category: 'Cardiovascular',
    form: 'Tablet',
    strength: '50 mg',
    description:
      'A trusted cardiovascular therapy supporting stable cardiac function in adult patients.',
    tag: 'flagship',
  },
  {
    id: 'cisplat',
    name: 'Cisplat',
    category: 'Oncology',
    form: 'Injection',
    strength: '50 mg/50 ml',
    description:
      'Platinum-based oncology infusion used in established chemotherapy regimens.',
    tag: 'flagship',
  },
  {
    id: 'lyric',
    name: 'Lyric',
    category: 'Neurology',
    form: 'Capsule',
    strength: '75 mg',
    description:
      'Neuropathic pain management capsule with proven tolerability profile.',
    tag: 'flagship',
  },
  {
    id: 'syndol',
    name: 'Syndol',
    category: 'Analgesic',
    form: 'Tablet',
    strength: '500 mg',
    description:
      'Combination analgesic for moderate pain relief with muscle relaxant support.',
    tag: 'flagship',
  },
  {
    id: 'amlovas',
    name: 'Amlovas',
    category: 'Cardiovascular',
    form: 'Tablet',
    strength: '5 mg',
    description: 'Calcium channel blocker for hypertension and angina management.',
  },
  {
    id: 'cef-3',
    name: 'Cef-3',
    category: 'Antibiotic',
    form: 'Capsule',
    strength: '300 mg',
    description: 'Third-generation cephalosporin for broad-spectrum bacterial infections.',
    tag: 'new',
  },
  {
    id: 'omastat',
    name: 'Omastat',
    category: 'Gastro',
    form: 'Capsule',
    strength: '20 mg',
    description: 'Proton-pump inhibitor for acid-related gastrointestinal disorders.',
  },
  {
    id: 'gluconorm',
    name: 'Gluconorm',
    category: 'Endocrine',
    form: 'Tablet',
    strength: '500 mg',
    description: 'Oral antidiabetic for type-2 diabetes mellitus management.',
  },
];

export const PRODUCT_CATEGORIES = [
  'All',
  'Cardiovascular',
  'Oncology',
  'Neurology',
  'Analgesic',
  'Antibiotic',
  'Gastro',
  'Endocrine',
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
    email: 'info@hplbd.com',
  },
  plant: {
    title: 'Manufacturing Plant',
    lines: ['Dhamair Char, Narayanganj', 'Industrial Zone, Bangladesh'],
    phone: '+880 2 7654 3210',
    email: 'plant@hplbd.com',
  },
  usContact: {
    title: 'U.S. Contact',
    lines: ['450 Technology Square, Suite 300', 'Cambridge, MA 02139, USA'],
    phone: '+1 (617) 555 0142',
    email: 'usa@hplbd.com',
  },
};

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: '#', icon: 'linkedin' },
  { label: 'Facebook', href: '#', icon: 'facebook' },
  { label: 'YouTube', href: '#', icon: 'youtube' },
  { label: 'Instagram', href: '#', icon: 'instagram' },
] as const;
