/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      colors: {
        custombg: "#5FAF9E",
      },
      radialGradientShapes: {
        'custom': 'circle 1292px at -13.6% 51.7%',
      },
      radialGradientColors: {
        'custom-gradient': ['rgba(0,56,68,1)', 'rgba(163,217,185,1)', 'rgba(255,252,247,1)'],
      },
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
}

