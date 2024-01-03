/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], //利用するファイルにパスを通す
  theme: {
    extend: {
      inset: {
        '10': '10%',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

