import common from "@/i18n/locales/ko/common.json";
import page from "@/i18n/locales/ko/page.json";

type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? (T[K] extends object ? `${K}.${NestedKeys<T[K]>}` : `${K}`) : never;
    }[keyof T]
  : "";

export type I18nResourceType = {
  common: NestedKeys<typeof common>;
  page: NestedKeys<typeof page>;
};

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
