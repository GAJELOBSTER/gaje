import { I18nResourceType } from "@/i18n/i18nConfig";

type NavListType = {
  title: I18nResourceType["common"];
  href: string;
};

const navList: NavListType[] = [
  {
    title: "nav.dashboard",
    href: "/main/dashboard",
  },
  {
    title: "nav.sample",
    href: "/main/sample",
  },
];

export default navList;
