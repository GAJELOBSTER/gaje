import "react-i18next";
import common from "@/i18n/locales/ko/common.json";
import page from "@/i18n/locales/ko/page.json";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      common: typeof common;
      page: typeof page;
    };
    contextSeparator: "-";
  }
}
