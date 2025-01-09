// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//     "./templates/**/*.php"
//   ],
//   theme: {
//     extend: {},
//   },
//   prefix: 'pn-',
//   corePlugins: {
//     preflight: false,
//   },
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./templates/**/*.php"
  ],
  theme: {
    extend: {},
  },
  prefix: 'pn-',
  corePlugins: {
    preflight: false,
  }
}