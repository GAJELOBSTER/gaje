"use client";

import { useMemo } from "react";

import AnyCheckedCheckBoxIcon from "@/assets/svg/AnyCheckedCheckBoxIcon";
import DefaultCheckBoxIcon from "@/assets/svg/DefaultCheckBoxIcon";
import SelectedCheckBoxIcon from "@/assets/svg/SelectedCheckBoxIcon";
import SelectedCheckIcon from "@/assets/svg/SelectedCheckIcon";
import DefaultCheckIcon from "@/assets/svg/DefaultCheckIcon";

export type checkBoxObjectType = { [key: number | string]: boolean };

type CheckBoxCategoryType = "checkbox" | "check";
type CheckBoxSizeType = "small" | "medium";

export interface ICheckBoxProps {
  className?: string;
  /** 비활성 여부 */
  disabled?: boolean;
  /** 전체 체크박스 여부 */
  isAllCheckBox?: boolean;
  /** 체크박스 타입 */
  category?: CheckBoxCategoryType;
  /** 체크박스 타입 */
  size?: CheckBoxSizeType;
  /** 체크박스 데이터 */
  label?: string;
  /** 데이터 ID */
  value?: number | string;
  /** checkBox 데이터 상태 리스트 */
  checkBoxStateList: checkBoxObjectType;
  /** checkBox 데이터 상태 리스트업데이트 */
  setCheckBoxStateList: React.Dispatch<React.SetStateAction<checkBoxObjectType>>;
}

export default function CheckBox({ category = "checkbox", size = "medium", ...props }: ICheckBoxProps) {
  const { className, disabled, isAllCheckBox, label, value, checkBoxStateList, setCheckBoxStateList } = props;

  const checkBoxSize: Record<CheckBoxSizeType, string> = {
    small: `
      [&_div]:typo-body-2-normal [&_div]:font-medium
      [&_svg]:w-6 [&_svg]:h-6
    `,
    medium: `
      [&_div]:typo-body-1-normal [&_div]:font-medium
      [&_svg]:w-7 [&_svg]:h-7
    `,
  };

  const checkBoxCategory: Record<CheckBoxCategoryType, string> = {
    checkbox: `
      [&:not(.disabled)_path.border-path]:hover:fill-border-primary
    `,
    check: `
      [&:not(.disabled)_path]:hover:stroke-background-primary
    `,
  };

  const checkedCheckBoxCategory: Record<CheckBoxCategoryType, string> = {
    checkbox: `
      [&:not(.disabled)_path]:hover:fill-background-primary-hover
    `,
    check: `
      [&:not(.disabled)_path]:hover:stroke-background-primary-hover
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
      ${className} cn-center items-start gap-3
      ${isAllChecked || isChecked ? checkedCheckBoxCategory[category] : isAnyChecked ? checkedCheckBoxCategory[category] : checkBoxCategory[category]}
      ${disabled ? "disabled cursor-no-drop opacity-50" : "cursor-pointer"}
      ${checkBoxSize[size]}
    `}
      onClick={(event: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) return;
        isAllCheckBox ? updateTotalCheckBoxState(event) : updateCheckBoxState(event);
      }}
    >
      <div className="flex-[0_0_auto]">
        {isAllChecked || isChecked ? (
          category === "checkbox" ? (
            <SelectedCheckBoxIcon />
          ) : (
            <SelectedCheckIcon />
          )
        ) : category === "checkbox" && isAnyChecked ? (
          <AnyCheckedCheckBoxIcon />
        ) : category === "checkbox" ? (
          <DefaultCheckBoxIcon />
        ) : (
          <DefaultCheckIcon />
        )}
      </div>

      {label && <div className={`flex-auto text-label-neutral`}>{label}</div>}
    </div>
  );
}
