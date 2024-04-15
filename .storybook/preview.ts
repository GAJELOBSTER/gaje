import "../src/styles/globals.css";
import i18n from "../src/i18n/i18-storybook";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  globals: {
    locale: "ko",
    locales: {
      ko: "한국어",
      en: "English",
    },
  },
  parameters: {
    i18n,
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
