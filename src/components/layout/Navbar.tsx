"use client";

// React
import { useState } from "react";

// Next
import Link from "next/link";

// Assets
import Feedcon from "@/assets/svg/FeedIcon";
import NotificationIcon from "@/assets/svg/NotificationIcon";
import CloseIcon from "@/assets/svg/CloseIcon";
import FeedHoverIcon from "@/assets/svg/FeedHoverIcon ";
import NotificationHoverIcon from "@/assets/svg/NotificationHoverIcon";

// Libs
import navList from "@/libs/data/navList";

// Types

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <div
        className={` ${isOpen ? "rounded-l-6 border-1 border-r-0" : "rounded-6 border-1"} relative h-[100vh] w-[280px] border-border-week bg-background-white p-7`}
      >
        <div className="typo-heading-1 mb-8 px-4 font-bold text-label-normal">Feed</div>
        {/* 고정 영역 */}
        <div className="typo-body-1-normal mb-8 flex flex-col gap-3 font-medium *:flex *:h-[40px] *:gap-4 *:rounded-3 *:px-4 *:py-[10px]">
          <Link className="group hover:bg-background-gray" href="/main">
            <div className="h-6 w-6">
              <Feedcon className="group-hover:hidden" />
              <FeedHoverIcon className="hidden group-hover:block" />
            </div>
            <div className="">내 피드</div>
          </Link>
          <div className="group cursor-pointer hover:bg-background-gray" onClick={() => setIsOpen(true)}>
            <div className="h-6 w-6">
              <NotificationIcon className="group-hover:hidden" />
              <NotificationHoverIcon className="hidden group-hover:block" />
            </div>
            <div className="">알림</div>
          </div>
        </div>

        <div className="typo-body-1-normal flex flex-col gap-3">
          <div className="typo-body-2-normal px-4 font-bold text-label-assistant">피드 관리</div>
          {navList.map((nav, index) => (
            <Link className="flex h-[40px] items-center gap-4 px-4 py-[10px]" key={`nav-list-${index}`} href={nav.href}>
              <div className="h-7 w-6">{nav.icon()}</div>
              <div className="group-hover:text-primary-inverse-var">{nav.title}</div>
            </Link>
          ))}
        </div>
      </div>
      {isOpen && (
        <div className="absolute -right-[280px] top-0 z-10 h-[100vh] w-[280px] rounded-r-6 border-1 border-border-week bg-background-white p-7">
          <div className="flex justify-between">
            <div className="typo-heading-1 mb-8 px-4 font-bold text-label-normal">알림</div>
            <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
