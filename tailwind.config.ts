/** @type {import('tailwindcss').Config} */

import typography from "@tailwindcss/typography";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        gridX: "url('/gridX.png')",
        gridXBig: "url('/gridXBig.png')",
      },
      colors: {
        primary: "hsl(120, 0%, 100%)",
        darkest: "hsl(120, 0%, 85%)",
        dark: "hsl(120, 0%, 70%)",
        mediumDark: "hsl(120, 0%, 50%)",
        medium: "hsl(120, 0%, 25%)",
        mediumLight: "hsl(0, 0%, 13%)",
        light: "hsl(120, 0%, 8%)",
        lightest: "hsl(120, 0%, 4.5%)",
        white: "hsl(120, 0%, 3%)",
      },
      borderWidth: {
        pt: "1pt",
      },
    },
  },
  plugins: [typography],
};
