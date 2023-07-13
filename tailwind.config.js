/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'mabecolor': '#3C829D',
        'bg-gris': '#FAFAFA',
        'gris-text': '#A1A1AA',
        'mabegreen': '#C3EDC0',
        'mabehover': '#1C4A5B',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
      },
    },
  },
  plugins: [],
}