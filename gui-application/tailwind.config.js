/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,hbs}"],
  safelist: [{ pattern: /alert|btn|flex|justify/ },],
  theme: {
    extend: {},
    container: {
      center: true
    }
  },
  plugins: [require('daisyui')]
}

