// Next
import Link from "next/link";

// Libs
import { navList } from "@/lib/data";
import SampleLogo from "@/assets/svg/SampleLogo";

export default function Navibar() {
  return (
    <div className="w-[260px] bg-gray-50 px-6 py-8 text-black">
      <div className="mb-8">
        <div className="typo-h1 line-height-1 flex items-center gap-4 font-bold">
          <SampleLogo />
          Next Sample
        </div>
      </div>
      <div className="typo-h2 flex flex-col gap-3">
        {navList.map((nav, index) => {
          return (
            <Link
              className="rounded-3 bg-gray-100 px-4 py-3 hover:bg-gray-200"
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
