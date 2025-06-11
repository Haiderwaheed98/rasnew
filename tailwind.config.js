/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a365d',
        secondary: '#2d3748',
        accent: '#e53e3e',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        heading: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
} 