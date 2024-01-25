// Next
import Link from "next/link";

// Libs
import { navList } from "@/lib/data";
import SampleLogo from "@/assets/svg/SampleLogo";

export default function Navibar() {
  return (
    <div className="bg-BG w-[260px] px-6 py-8 text-black">
      <div className="mb-9">
        <div className="text-24 flex items-center gap-2 font-bold leading-5">
          <SampleLogo />
          Next Sample
        </div>
      </div>
      <div className="flex flex-col gap-2 font-medium">
        {navList.map((nav, index) => {
          return (
            <Link
              className="bg-gray-20 hover:bg-gray-30 rounded-lg px-4 py-3"
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
