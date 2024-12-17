import type { StorybookConfig } from "@storybook/nextjs";
import type { RuleSetRule } from "webpack";
import path from "path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
      };
    }

    const rules = config.module?.rules as RuleSetRule[];

    // 기존 SVG 로더 비활성화
    if (config?.module?.rules) {
      config.module.rules = rules.map((rule) => {
        if (
          rule.test instanceof RegExp && // test가 정규식인지 확인
          rule.test.test(".svg") // 정규식이 `.svg`와 일치하는지 확인
        ) {
          return { ...rule, exclude: /\.svg$/ }; // 기존 로더를 비활성화
        }
        return rule;
      });
    }

    // SVGR 로더 추가
    config?.module?.rules?.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
      include: path.resolve(__dirname, "../"),
    });

    return config;
  },
  staticDirs: ["../public"],
};
export default config;
