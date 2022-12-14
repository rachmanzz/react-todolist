/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppin-sans': ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms')
  ],
}
