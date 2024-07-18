// Next
import Link from "next/link";

// Libs
import navList from "@/libs/data/navList";
import SampleLogoIcon from "@/assets/svg/SampleLogoIcon";

// Types

export default async function Navibar() {
  return (
    <div className="flex-[0_0_260px] bg-neutral-50 px-6 py-8 text-neutral-600">
      <div className="mb-8">
        <div className="typo-title2-sb line-height-1 flex items-center gap-4 font-bold">
          <SampleLogoIcon />
          Next 샘플
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
              {nav.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
