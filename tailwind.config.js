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
      animation: {
        'gradient-x': 'gradient-x 15s linear infinite',
        'blob': 'blob 7s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'blob': {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)'
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)'
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 