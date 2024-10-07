"use client";

// React
import { useState } from "react";

// Components
import Chips from "@/components/common/Chips";

export default function Main() {
  const test = [
    {
      index: 1,
      title: "Feed Name1",
      image: "/png/dummyIcon.png",
    },
    {
      index: 2,
      title: "Feed Name2",
      image: "/png/dummyIcon.png",
    },
    {
      index: 3,
      title: "Feed Name3",
      image: "/png/dummyIcon.png",
    },
    {
      index: 4,
      title: "Feed Name4",
      image: "/png/dummyIcon.png",
    },
    {
      index: 5,
      title: "Feed Name5",
      image: "/png/dummyIcon.png",
    },
  ];

  const [checkedData, setCheckedData] = useState("");

  return (
    <div className="ml-9 py-7">
      <div className="typo-heading-1 mb-[18px] font-bold">내 피드</div>
      {/* input 영역 */}
      <div className="h-[144px] w-full max-w-[640px] rounded-6 bg-white px-7 py-6">
        <div className="max-w-[632px] overflow-y-auto">
          <div className="flex gap-3">
            {test.map((data) => (
              <Chips
                key={data.title}
                title={data.title}
                checkedData={checkedData}
                setCheckedData={setCheckedData}
                image={data.image}
              />
            ))}
          </div>
          tT
        </div>
      </div>
    </div>
  );
}
