import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        darkGreen: '#415E15', // Hijau tua
        lightGreen: '#87C42B', // Hijau muda
        Purple: '#B0689A', // core
        softBlue: '#618B98', // cmd
        softGreen: '#4D7E5F', // atc
        softBrown: '#A49A67', // mlc
        softRed: '#AC6565', // rdc
        softMix: '#6965AC', //hrd
        softDarkBlue: '#4F61D9', //ddc
      },
    },
  },
  darkMode: "class",
  darkMode: "class",
  plugins: [nextui()],
};
