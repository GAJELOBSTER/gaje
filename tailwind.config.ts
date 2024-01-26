// Libs
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { customComponents, pxToRem } from "./tailwind.plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      BG: "#f9f9f9",
      black: "#111111",
      white: "#ffffff",
      orange: {
        100: "#F65434",
        200: "#FF5736",
        300: "#FEEEEB",
        400: "#FDDDD6",
      },
      gray: {
        50: "#EFF0F2",
        100: "#E0E1E5",
        200: "#C1C3CB",
        300: "#A2A4B2",
        400: "#838698",
        500: "#64687E",
        600: "#505365",
        700: "#3C3E4C",
        800: "#282A32",
        900: "#141519",
      },
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    fontSize: {},
    spacing: {
      "0": "0px",
      "1": "2px",
      "2": "4px",
      "3": "8px",
      "4": "12px",
      "5": "16px",
      "6": "20px",
      "7": "24px",
      "8": "32px",
      "9": "40px",
      "10": "48px",
      "11": "56px",
      "12": "64px",
    },
    borderRadius: {
      "0": "0px",
      "1": "2px",
      "2": "4px",
      "3": "6px",
      "4": "8px",
    },
  },
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    placeholderOpacity: false,
    divideOpacity: false,
    ringOpacity: false,
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({ ...customComponents });
    }),
  ],
};
export default config;
