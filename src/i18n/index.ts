import { createInstance, i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig, { I18nLocaleType, i18nNamespaces } from "@/i18n/i18nConfig";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import common from "@/i18n/locales/ko/common.json";
import page from "@/i18n/locales/ko/page.json";

type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]-?: K extends string | number ? (T[K] extends object ? `${K}.${NestedKeys<T[K]>}` : `${K}`) : never;
    }[keyof T]
  : "";

type I18nResourceType = {
  common: NestedKeys<typeof common>;
  page: NestedKeys<typeof page>;
};

export async function useTranslation<T extends keyof I18nResourceType>(
  locale: I18nLocaleType,
  namespaces: T | typeof i18nNamespaces,
  i18nInstance?: i18n,
  resources?: any,
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);
  i18nInstance.use(LanguageDetector);
  i18nInstance.use(Backend);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)),
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: typeof namespaces === "string" ? namespaces : namespaces[0],
    fallbackNS: typeof namespaces === "string" ? namespaces : namespaces[0],
    ns: typeof namespaces === "string" ? [namespaces] : namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: (key: I18nResourceType[T]) => i18nInstance?.t(key),
  };
}
