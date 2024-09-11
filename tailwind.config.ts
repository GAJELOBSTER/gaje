// Libs
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// Styles
import { customComponents } from "./src/styles/tailwindPlugin";
import palette from "./src/styles/palette";
const { common, gray, blue, black, white, purple, navy, green, red, orange, darkgreen, transparent } = palette;

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/stories/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: black,
      white: white,
      transparent,
      brand: { ...purple },
      neutral: { ...navy },
      positive: { ...green },
      negative: { ...red },
      warning: { ...orange },
      excel: { ...darkgreen },
      background: {
        primary: blue[500],
        secondary: gray[800],
        white: common["white"],
        gray: gray[100],
        negative: red[500],
      },
      border: {
        primary: blue[500],
        focused: gray[800],
        enabled: gray[200],
        negative: red[500],
      },
      label: {
        strong: common["black"],
        normal: gray[900],
        neutral: gray[700],
        assistant: red[500],
        primary: blue[500],
        common: common["white"],
        negative: red[500],
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
      "9": "36px",
      "10": "48px",
      "11": "56px",
      "12": "52px",
      "13": "56px",
      "14": "64px",
    },
    borderRadius: {
      "0": "0px",
      "1": "2px",
      "2": "4px",
      "3": "6px",
      "4": "8px",
      "5": "12px",
      "6": "16px",
      "7": "20px",
      "8": "24px",
      "9": "28px",
      "10": "32px",
    },
    borderWidth: {
      "0": "0px",
      "1": "1px",
      "2": "2px",
      "3": "4px",
      "4": "4px",
    },
    outlineWidth: {
      "0": "0px",
      "1": "1px",
      "2": "2px",
      "3": "4px",
      "4": "4px",
    },
    extend: {
      transitionProperty: {
        "font-size": "font-size",
      },
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
