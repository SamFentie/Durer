/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: {
        100: "#F9F9FA",
        150: "#DEE9FD",
        200: "#D4D5A4",
        300: "#96A0AA",
        400: "#FFFFFF",
        500: "#A6A746",
        550: "#A6C000",
        600: "#314458",
        700: "#0e7490",
        800: "#155e75",
        900: "#b45309",
        950: "#93d1ff",
      },
      tahiti: {
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
        400: "#22d3ee",
        500: "#06b6d4",
        600: "#0891b2",
        700: "#0e7490",
        800: "#155e75",
        900: "#b45309",
      },
      // ...
    },
    extend: {
      fontFamily: {
        interr: ["Inter_18pt-Regular", "sans-serif"],
        interrbold: ["Inter_18pt-Bold", "sans-serif"],
        interreb: ["Inter_18pt-ExtraBold", "sans-serif"],
        interreL: ["Inter_18pt-ExtraLight", "sans-serif"],
        interrL: ["Inter_18pt-Light", "sans-serif"],
        interrm: ["Inter_18pt-Medium", "sans-serif"],
        interrs: ["Inter_18pt-SemiBold", "sans-serif"],
        interrt: ["Inter_18pt-Thin", "sans-serif"],
        interbb: ["Inter_24pt-Black", "sans-serif"],
        interbbold: ["Inter_24pt-Bold", "sans-serif"],
        interbebi: ["Inter_24pt-ExtraBoldItalic", "sans-serif"],
        interbel: ["Inter_24pt-ExtraLight", "sans-serif"],
      },
    },
  },
  plugins: [],
};
