/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: {
            1: '#0E47B3',
            2: '#1155CC',
            3: '#3F71D1',
            4: '#6C8ED5',
            5: '#9DBDFF'
          },
          secondary: {
            1: '#00B7E0',
            2: '#00CEFF',
            3: '#33D7F7',
            4: '#66DFEF',
            5: '#B5F6FF',
          },
          complementary: {
            1: '#D9E100',
            2: '#F0FF00',
            3: '#F4FF62',
            4: '#F5FF9D',
            5: '#F9FFBF',
          },
          error: {
            1: '#E04242',
            2: '#E81414',
            3: '#F08C8C',
            4: '#F9A3A3',
            5: '#FFCFCF',
          },
          orange: {
            1: '#FF6F00'
          },
          success: {
            1: '#6CDE2A'
          },
          gray: {
            1: '#B3B3B3',
            2: '#D0D0D0',
            3: '#E5E5E5',
            4: '#EEEEEE',
          },
          dark: {
            1: '#0B1E42',
            2: '#112F69',
            3: '#1D3E7D',
            4: '#1F4A9A',
          },
          light: {
            n1: '#F8F8F8'
          },
          'dark-gray': {
            1: '#2C2E32'
          }
        }
      }
    },
  },
  plugins: [],
}
