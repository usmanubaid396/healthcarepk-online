/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep corporate blues (kept for back-compat with existing tokens)
        navy: {
          50: '#eef2fb',
          100: '#d4dded',
          200: '#a8bcd9',
          300: '#6e8bbf',
          400: '#3f63a3',
          500: '#1f4486',
          600: '#16316b',
          700: '#0f2350',
          800: '#0a1840',
          900: '#06102c',
          950: '#03091b',
        },
        // Accent — muted clinical cyan (kept for back-compat)
        accent: {
          50: '#ecfdff',
          100: '#cff7fe',
          200: '#9eeffb',
          300: '#5ce3f8',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 6s linear infinite',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
    },
  },
  plugins: [],
};
