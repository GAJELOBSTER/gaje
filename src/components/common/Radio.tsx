"use client";

import DefaultRadioBoxIcon from "@/assets/svg/DefaultRadioBoxIcon";
import SelectedRadioBoxIcon from "@/assets/svg/SelectedRadioBoxIcon";

type RadioCategoryType = "default" | "box";

export interface IRadioProps {
  className?: string;
  /** 비활성 여부 */
  disabled?: boolean;
  /** 라디오 카테고리, 디자인 시스템(피그마 컨벤션) */
  category?: RadioCategoryType;
  /** 라디오버튼 데이터 */
  label?: string;
  /** 라디오 값 */
  value: string;
  /** 선택된 라디오 값 -> const [sample, setSample] = useState<string>("") */
  checkedValue: string;
  /** 선택된 라디오 값 업데이트 -> const [sample, setSample] = useState<string>("") */
  setCheckedValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function Radio({ category = "default", ...props }: IRadioProps) {
  const radioCategory: Record<RadioCategoryType, string> = {
    default: `
      [&_circle]:stroke-neutral-200 
      [&:not(.disabled)_circle]:hover:fill-neutral-50
      [&:not(.disabled)_circle]:hover:stroke-neutral-300
    `,
    box: `
      p-4 bg-white outline outline-1 outline-neutral-100 
      [&_circle]:stroke-neutral-200
      [&:not(.disabled)]:hover:bg-neutral-50
      [&:not(.disabled)]:hover:outline-neutral-200 
      [&:not(.disabled)_circle]:hover:stroke-neutral-300
    `,
  };

  const checkedRadioCategory: Record<RadioCategoryType, string> = {
    default: `
      [&_circle]:fill-brand-500
      [&:not(.disabled)_circle]:hover:fill-brand-600
      [&:not(.disabled)_circle]:hover:stroke-brand-600
    `,
    box: `
      p-4 bg-brand-50 outline outline-2 outline-brand-500 
      [&_circle]:fill-brand-500
      [&:not(.disabled)]:hover:bg-brand-100
      [&:not(.disabled)]:hover:outline-brand-600
      [&:not(.disabled)_circle]:hover:fill-brand-600
      [&:not(.disabled)_circle]:hover:stroke-brand-600
    `,
  };

  return (
    <div
      className={`
        ${props.className} cn-center items-start gap-3 rounded-3 [&:not(.disabled)]:cursor-pointer 
        ${props.checkedValue === props.value ? checkedRadioCategory[category] : radioCategory[category]} 
        ${props.disabled && "disabled cursor-no-drop opacity-50"}
      `}
      onClick={() => !props.disabled && props.setCheckedValue(props.value)}
    >
      <div className="flex-[0_0_auto]">
        {props.checkedValue === props.value ? <SelectedRadioBoxIcon /> : <DefaultRadioBoxIcon />}
      </div>
      {props.label && <div className={"typo-body2-m flex-auto text-neutral-800"}>{props.label}</div>}
    </div>
  );
}
