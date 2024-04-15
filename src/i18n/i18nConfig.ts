export const i18nLocales = ["ko", "en"] as const;
export type I18nLocaleType = (typeof i18nLocales)[number];

export const i18nNamespaces = ["common", "page"] as const;
export type I18nNamespaceType = (typeof i18nNamespaces)[number];

interface IConfig {
  locales: I18nLocaleType[];
  defaultLocale: I18nLocaleType;
  prefixDefault: boolean;
}

const i18nConfig: IConfig = {
  locales: ["en", "ko"],
  defaultLocale: "ko",
  prefixDefault: false,
};

export default i18nConfig;
