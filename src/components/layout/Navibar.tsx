// Next
import Link from "next/link";
import { useTranslation } from "@/i18n";

// Libs
import navList from "@/libs/data/navList";
import SampleLogoIcon from "@/assets/svg/SampleLogoIcon";

// Types
import { ILocaleProps } from "@/types/commonType";

export default async function Navibar(props: ILocaleProps) {
  const { t: commonT } = await useTranslation(props.locale, "common");
  return (
    <div className="flex-[0_0_260px] bg-neutral-50 px-6 py-8 text-neutral-600">
      <div className="mb-8">
        <div className="typo-title2-sb line-height-1 flex items-center gap-4 font-bold">
          <SampleLogoIcon />
          {commonT("nav.title")}
        </div>
      </div>
      <div className="typo-body2-sb flex flex-col gap-3">
        {navList.map((nav, index) => {
          return (
            <Link
              className="rounded-3 bg-neutral-100 px-4 py-3 hover:bg-neutral-200"
              key={`nav-list-${index}`}
              href={nav.href}
            >
              {commonT(nav.title)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
