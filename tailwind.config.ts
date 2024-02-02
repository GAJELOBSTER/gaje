// Libs
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// Styles
import { customComponents } from "./src/styles/tailwindPlugin";
import palette from "./src/styles/palette";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...palette,
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
