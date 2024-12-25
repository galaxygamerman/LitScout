import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: '#2563EB',
        },
        gray: {
          200: '#E5E7EB',
          500: '#6B7280',
        },
      },
      fontSize: {
        '7xl': '5rem',
      },
      spacing: {
        '12': '3rem',
      },
    },
  },
  plugins: [],
};

export default config;