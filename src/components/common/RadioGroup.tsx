"use client";

import DefaultRadioBoxIcon from "@/assets/svg/DefaultRadioBoxIcon";
import SelectedRadioBoxIcon from "@/assets/svg/SelectedRadioBoxIcon";

type RadioDataType = {
  value: string;
  label: string;
};

interface Iprops {
  className?: string;
  /** 라디오 버튼 목록 */
  data: RadioDataType[];
  /** 선택된 라디오 상태값 -> const [sample, setSample] = useState<string>("") */
  checkedValue: string;
  /** 선택된 라디오 상태값 업데이트 -> const [sample, setSample] = useState<string>("") */
  setCheckedValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function RadioGroup(props: Iprops) {
  const getCheckedClassName = (category: RadioDataType) => {
    return props.checkedValue === category.value
      ? "bg-purple-50 outline outline-2 outline-purple-500"
      : "bg-white outline outline-1 outline-navy-200";
  };

  const getCheckedLabelClassName = (category: RadioDataType) => {
    return props.checkedValue === category.value ? "typo-title1" : "typo-title2";
  };

  return (
    <div className={props.className}>
      {props.data.map((data, index) => (
        <div
          key={data.value ?? index}
          className={`${getCheckedClassName(data)} cn-center cursor-pointer gap-3 rounded-3 p-4`}
          onClick={() => props.setCheckedValue(data.value)}
        >
          {props.checkedValue === data.value ? <SelectedRadioBoxIcon /> : <DefaultRadioBoxIcon />}
          <div className={`${getCheckedLabelClassName(data)} text-navy-600`}>{data.label}</div>
        </div>
      ))}
    </div>
  );
}
