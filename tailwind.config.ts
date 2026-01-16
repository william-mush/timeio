import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '360px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          100: '#e6f0ff',
          200: '#cce0ff',
          300: '#99c0ff',
          400: '#66a0ff',
          500: '#3380ff',
          600: '#0066ff',
        },
        secondary: {
          100: '#f0f4f8',
          200: '#d9e2ec',
          300: '#bcccdc',
          400: '#9fb3c8',
          500: '#829ab1',
          600: '#627d98',
        },
        accent: {
          100: '#fff0f0',
          200: '#ffe0e0',
          300: '#ffc0c0',
          400: '#ffa0a0',
          500: '#ff8080',
          600: '#ff6060',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config 