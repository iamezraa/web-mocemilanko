import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'basreng-red': '#DC2626',
        'basreng-orange': '#EA580C',
        'balado-red': '#991B1B',
        'chicken-yellow': '#FBBF24',
        'chicken-brown': '#D2691E',
        'original-cream': '#F5F1E8',
        'original-beige': '#E8DCC8',
        'original-salt-light': '#5BA3D0',
        'original-salt': '#3B7AC3',
        'bbq-brown': '#5C4033',
        'bbq-orange': '#FF8C42',
        'cheese-yellow': '#FFD700',
        'corn-yellow': '#FEB139',
        'corn-green': '#84CC16',
        'fruit-orange': '#FF8C42',
        'fruit-yellow': '#FFD700',
        'fruit-green': '#7CB342',
        'fruit-cream': '#F5E6D3',
        'fruit-red': '#E8705E',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
