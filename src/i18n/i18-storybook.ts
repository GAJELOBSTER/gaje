import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { i18nNamespaces, i18nLocales, I18nNamespaceType, I18nLocaleType } from "@/i18n/i18nConfig";

type ResourcesType = {
  [key in I18nLocaleType]: {
    [key in I18nNamespaceType]?: string;
  };
};

const resources = i18nNamespaces.reduce<ResourcesType>((acc, n) => {
  i18nLocales.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {};
    acc[lng] = {
      ...acc[lng],
      [n]: require(`./locales/${lng}/${n}.json`),
    };
  });
  return acc;
}, {} as ResourcesType);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    lng: "ko",
    fallbackLng: "ko",
    defaultNS: i18nNamespaces[0],
    ns: i18nNamespaces,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs: i18nLocales,
    resources,
  });

export default i18n;
