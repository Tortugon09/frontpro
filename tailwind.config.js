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
        'bgcolor': '#2C2C2E',
        'text': '#5E5CE6',
        'bgcolor2': '#1C1C1E',
        'text2': '#3D3C41',
        'mabehover': '#1C4A5B',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
      },
    },
  },
  plugins: [],
}