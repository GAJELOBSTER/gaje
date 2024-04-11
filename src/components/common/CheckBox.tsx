"use client";

import { useMemo } from "react";

import AnyCheckedCheckBoxIcon from "@/assets/svg/AnyCheckedCheckBoxIcon";
import DefaultCheckBoxIcon from "@/assets/svg/DefaultCheckBoxIcon";
import SelectedCheckBoxIcon from "@/assets/svg/SelectedCheckBoxIcon";

export type checkBoxObjectType = { [key: number | string]: boolean };

type CheckBoxCategoryType = "default";

interface Iprops {
  className?: string;
  /** 비활성 여부 */
  disabled?: boolean;
  /** 전체 체크박스 여부 */
  isAllCheckBox?: boolean;
  /** 체크박스 타입 */
  category?: CheckBoxCategoryType;
  /** 체크박스 데이터 */
  label?: string;
  /** 데이터 ID */
  value?: number | string;
  /** checkBox 데이터 상태 리스트 */
  checkBoxStateList: checkBoxObjectType;
  /** checkBox 데이터 상태 리스트업데이트 */
  setCheckBoxStateList: React.Dispatch<React.SetStateAction<checkBoxObjectType>>;
}

export default function CheckBox({ category = "default", ...props }: Iprops) {
  const { className, disabled, isAllCheckBox, label, value, checkBoxStateList, setCheckBoxStateList } = props;
  const checkBoxCategory: Record<CheckBoxCategoryType, string> = {
    default: `
      [&_rect]:stroke-neutral-200
      [&:not(.disabled)_rect]:hover:fill-neutral-50
      [&:not(.disabled)_rect]:hover:stroke-neutral-300
    `,
  };

  const checkedCheckBoxCategory: Record<CheckBoxCategoryType, string> = {
    default: `
      first:[&_rect]:fill-brand-500
      first:[&:not(.disabled)_rect]:hover:fill-brand-600
      first:[&:not(.disabled)_rect]:hover:stroke-brand-600
    `,
  };

  const checkBoxListState = Object.values(checkBoxStateList);
  const hasInitState = checkBoxListState.length > 0;
  const isChecked = value !== undefined && checkBoxStateList[value];

  const isAllChecked = useMemo(() => hasInitState && checkBoxListState.every((state) => state), [checkBoxStateList]);
  const isAnyChecked = useMemo(() => checkBoxListState.some((state) => state), [checkBoxStateList]) && isAllCheckBox;

  const updateTotalCheckBoxState = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setCheckBoxStateList(Object.keys(checkBoxStateList).reduce((pre, cur) => ({ ...pre, [cur]: !isAnyChecked }), {}));
  };

  const updateCheckBoxState = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (value === undefined) return;

    setCheckBoxStateList((before) => ({ ...before, [value]: !checkBoxStateList[value] }));
  };

  return (
    <div
      className={`
      ${className} cn-center items-start gap-3 [&:not(.disabled)]:cursor-pointer
      ${isAllChecked || isChecked ? checkedCheckBoxCategory[category] : isAnyChecked ? checkedCheckBoxCategory[category] : checkBoxCategory[category]}
      ${disabled ? "disabled cursor-no-drop opacity-50" : ""}
    `}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        isAllCheckBox ? updateTotalCheckBoxState(event) : updateCheckBoxState(event);
      }}
    >
      <div className="flex-[0_0_auto]">
        {isAllChecked || isChecked ? (
          <SelectedCheckBoxIcon />
        ) : isAnyChecked ? (
          <AnyCheckedCheckBoxIcon />
        ) : (
          <DefaultCheckBoxIcon />
        )}
      </div>

      {label && <div className={`typo-body2-m flex-auto text-neutral-800`}>{label}</div>}
    </div>
  );
}
