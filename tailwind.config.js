/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        darkBg: '#09050E',
        brandBlue: '#1400FF',
        lighterBg: '#0D0615',
      }
    },
  },
  plugins: [],
}