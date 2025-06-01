/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'beige': '#F1DAC4',
        'lavender-gray': '#A69CAC',
        'slate-blue-dark': '#474973',
        'deep-night-blue': '#161B33',
        'navy-midnight': '#0D0C1D'
      },
      backgroundImage: {
        'radial-custom': 'radial-gradient(circle,rgb(10, 9, 22),rgb(11, 16, 34),rgb(13, 18, 34),rgb(40, 49, 92))'
      },
      boxShadow: {
        'custom-purple': '0 4px 10px 0 #A69CAC',
      },
      dropShadow: {
        'custom-purple': '0 4px 10px #A69CAC',
      }
    },
  },
  plugins: [],
}

