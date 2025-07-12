/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nb-primary': '#FF6B6B',
        'nb-secondary': '#4ECDC4',
        'nb-accent': '#45B7D1',
        'nb-warning': '#FFE66D',
        'nb-success': '#95E1D3',
        'nb-error': '#FF8A80',
        'nb-black': '#000000',
        'nb-white': '#FFFFFF',
      },
      boxShadow: {
        'nb-sm': '2px 2px 0px 0px #000000',
        'nb-md': '4px 4px 0px 0px #000000',
        'nb-lg': '6px 6px 0px 0px #000000',
        'nb-xl': '8px 8px 0px 0px #000000',
      },
      borderWidth: {
        'nb-sm': '2px',
        'nb-md': '3px',
        'nb-lg': '4px',
      },
      fontFamily: {
        'nb': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'nb-bold': '700',
        'nb-semibold': '600',
        'nb-medium': '500',
        'nb-normal': '400',
      },
      spacing: {
        'nb-xs': '0.25rem',
        'nb-sm': '0.5rem',
        'nb-md': '1rem',
        'nb-lg': '1.5rem',
        'nb-xl': '2rem',
        'nb-2xl': '3rem',
      },
      borderRadius: {
        'nb-sm': '4px',
        'nb-md': '8px',
        'nb-lg': '12px',
      },
      transitionDuration: {
        'nb-fast': '0.15s',
        'nb-normal': '0.25s',
        'nb-slow': '0.35s',
      },
    },
  },
  plugins: [],
} 