"use client";

// React
import { useState } from "react";

// Next

// Assets
import CloseIcon from "@/assets/svg/CloseIcon";
import NoneNotificationIcon from "@/assets/svg/NoneNotificationIcon";

// Types

// libs
import { mockNotificationList } from "@/libs/data/mockData";

interface INotificationListProps {
  setIsNotificationOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NotificationList(props: INotificationListProps) {
  const notificationData = mockNotificationList(10);

  return (
    <div className="absolute -right-[280px] top-0 z-10 h-[100vh] w-[280px] rounded-r-6 border-1 border-border-week bg-background-white p-7">
      <div className="flex justify-between">
        <div className="typo-heading-1 mb-8 px-4 font-semibold text-label-normal">알림</div>
        <div className="cursor-pointer" onClick={() => props.setIsNotificationOpen(false)}>
          <CloseIcon />
        </div>
      </div>

      {/* 알림 리스트 */}
      <div className="h-[calc(100vh-108px)] overflow-auto">
        {notificationData.length > 0 ? (
          notificationData.map((data) => (
            <div className="">
              <div className="mb-3 flex">
                <div></div>
                <div className="typo-body-2-normal text-label-normal">{data.user}</div>
              </div>
              <div className="typo-body-2-reading mb-4 line-clamp-3 text-label-neutral">{data.text}</div>

              <div className="typo-caption-1 mb-4 flex text-label-assistant">
                <div className="flex-[1_0_auto]">{data.date}</div>
                <div className="line-clamp-1 flex-[0_1_auto] text-ellipsis">{data.title}</div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <div className="mx-auto mb-5 h-[40px] w-[40px]">
              <NoneNotificationIcon />
            </div>
            <div className="typo-body-2-reading text-center text-label-neutral">새로운 알림이 없습니다.</div>
          </div>
        )}
      </div>
    </div>
  );
}
