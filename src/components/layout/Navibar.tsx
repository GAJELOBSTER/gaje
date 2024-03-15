// Next
import Link from "next/link";

// Libs
import { navList } from "@/libs/data";
import SampleLogoIcon from "@/assets/svg/SampleLogoIcon";

export default function Navibar() {
  return (
    <div className="bg-neutral-50 text-neutral-600 flex-[0_0_260px] px-6 py-8">
      <div className="mb-8">
        <div className="typo-title2-sb line-height-1 flex items-center gap-4 font-bold">
          <SampleLogoIcon />
          Next Sample
        </div>
      </div>
      <div className="typo-body2-sb flex flex-col gap-3">
        {navList.map((nav, index) => {
          return (
            <Link
              className="bg-neutral-100 hover:bg-neutral-200 rounded-3 px-4 py-3"
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
