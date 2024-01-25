import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const pxToRem = (px: number) => {
  return `${px / 16}rem`;
};

const apply = (className: string, styles?: object) => {
  return { [`@apply ${className}`]: {}, ...styles };
};

const addPrefix = (data: any, prefix: string) => {
  for (const property in data) {
    delete Object.assign(data, { [`.${prefix}-${property}`]: data[property] })[property];
  }
};
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        BG: "#f9f9f9",
        white: "#ffffff",
        orange: {
          1: "#F65434",
          2: "#FF5736",
          3: "#FEEEEB",
          4: "#FDDDD6",
        },
        gray: {
          1: "#D8DAE4",
          2: "#EBEDF7",
          10: "#FCFAFC",
          15: "#F2F1F2",
          20: "#EAE9EB",
          30: "#DBD9DB",
          40: "#C9C5C9",
          50: "#939094",
          60: "#605D62",
          70: "#313033",
          80: "#242226",
          90: "#1C1B1E",
          100: "#0F0F0F",
        },
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      fontSize: {
        10: pxToRem(10),
        12: pxToRem(12),
        14: pxToRem(14),
        16: pxToRem(16),
        18: pxToRem(18),
        20: pxToRem(20),
        24: pxToRem(24),
        28: pxToRem(28),
        32: pxToRem(32),
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      const typo = {
        h1: apply("font-medium text-20"),
        h2: apply("font-medium text-18"),
        title1: apply("font-semibold text-16"),
        title2: apply("font-regular text-14"),

        // 기본 문법
        // title3: {
        //   "@apply font-reqular": {},
        //   lineHeight: "100%",
        // },
      };

      const cn = {
        center: apply("flex items-center justify-center"),
      };

      addPrefix(typo, "typo");
      addPrefix(cn, "cn");

      addComponents({ ...typo, ...cn });
    }),
  ],
};
export default config;
