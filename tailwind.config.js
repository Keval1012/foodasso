/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-gray': 'rgba(175, 175, 175, 0.15)', // Semi-transparent gray
        'custom-orange-alpha': 'rgba(255, 158, 27, 0.2)',
        'gray-custom': 'rgba(61, 61, 61, 0.36)',
        'custom-orange': '#f49063',
        'custom-light': 'rgba(255, 244, 228, 0.3)',



      },
      fontFamily: {
        sans: ["Poppins", "Lato", "Plus Jakarta Sans", "sans-serif"],
      },



    },
  },
  plugins: [],
};
