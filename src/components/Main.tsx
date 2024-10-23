"use client";

// React
import { ChangeEvent, useState } from "react";

// Components
import Chips from "@/components/common/Chips";
import TextField from "@/components/common/TextField";
import useInput from "@/hooks/useInput";
import ShowPassword from "@/assets/svg/ShowPassword";
import Toggle from "@/components/common/Toggle";

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
  const [checked, setChecked] = useState<boolean>(true);
  const testInput = useInput();

  // console.log("testInput", testInput);

  return (
    <div className="ml-9 py-7">
      <div className="typo-heading-1 mb-[18px] font-bold">내 피드</div>
      {/* input 영역 */}
      <div className="bg-white h-[144px] w-full max-w-[640px] rounded-6 px-7 py-6">
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
        </div>
      </div>

      {/* 텍스트필드 테스트 */}
      <div className="mt-6 bg-background-white">
        <TextField
          {...testInput}
          placeholder="플레이스홀더"
          size="small"
          label="레이블"
          helperText="도움말 텍스트"
          width={190}
          multiline
          endIcon={
            <div className="cursor-pointer">
              <ShowPassword />
            </div>
          }
          // error
          // disabled
        />
        <br />
        <br />
        <TextField
          {...testInput}
          placeholder="플레이스홀더"
          size="small"
          label="레이블"
          helperText="도움말 텍스트"
          width={190}
          endIcon={
            <div className="cursor-pointer">
              <ShowPassword />
            </div>
          }
          // multiline
          // error
          // disabled
        />
      </div>

      {/* toggle 테스트 */}
      <div className="mt-6 bg-background-white">
        <Toggle
          disabled
          size={"small"}
          label="Label"
          labelPosition="top"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <br />
        <Toggle
          labelPosition="left"
          size={"large"}
          label="Label"
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
      </div>

      <div className="bg-background-gray-bold typo-body-2-normal font-medium"></div>
    </div>
  );
}
