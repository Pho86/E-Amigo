/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0B0019',
        primarybg: '#1D1A22',
        primary: '#7A54E7',
        topbg:'#14002E',
        secondary: '#A658F4',
        primarydark: '#6129FF',

      },
      dropShadow: {
        'primary': '5px 5px 0 rgba(122, 84, 231, 1)',
        'primary-sm': '2px 2px 0 rgba(122, 84, 231, 1)' ,
        'primary-lg': '8px 8px 0 rgba(75, 212, 250, 1)',
        'primary-special': [
          '8px 6px 0 rgba(75, 212, 250, 1)',
          '6px 6px 0 rgba(0, 0, 0, 1)',
        ]
      },
      gridTemplateColumns:{
        'home': 'repeat(auto-fit, minmax(370px,3fr));'
      }
    },
  },
  plugins: [],
}
