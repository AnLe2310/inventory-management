/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,hbs}"],
  safelist: [{ pattern: /alert|btn|flex|justify/ },],
  theme: { extend: {} },
  plugins: [require('daisyui')]
}

