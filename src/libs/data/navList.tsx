import BookmarkIcon from "@/assets/svg/BookmarkIcon";
import HiddneIcon from "@/assets/svg/HiddenIcon";
import SettingIcon from "@/assets/svg/SettingIcon";

type NavListType = {
  title: string;
  icon: () => React.ReactNode;
  href: string;
};

const navList: NavListType[] = [
  {
    title: "북마크",
    icon: () => <BookmarkIcon />,
    href: "/main/bookmark",
  },
  {
    title: "숨겨진 피드",
    icon: () => <HiddneIcon />,
    href: "/main/hidden",
  },
  {
    title: "설정",
    icon: () => <SettingIcon />,
    href: "/main/setting",
  },
];

export default navList;
