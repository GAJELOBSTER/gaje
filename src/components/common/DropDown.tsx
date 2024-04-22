"use client";

import { useRef, useState } from "react";

import { DropDownLabel } from "@/components/common/DropDown/DropDownLabel";
import { DropDownSelectedValue } from "@/components/common/DropDown/DropDownSelectedValue";
import { DropDownOption } from "@/components/common/DropDown/DropDownOption";
import { DropDownHelperText } from "@/components/common/DropDown/DropDownHelperText";

export type DropDownCategoryType = "default" | "fluid";
export type DropDownSizeType = "large" | "medium" | "small";
type WidthUnitType = "px" | "%" | "em" | "vh";
type LabelPositionType = "vertical" | "horizon";

export interface IDropDownProps {
  className?: string;
  /** dropDown selected value 영역 backgroun color className 지정*/
  backgroundClassName?: string;
  /** readonly 여부 */
  readonly?: boolean;
  /** 필수 값 여부 */
  required?: boolean;
  /** 에러 여부 */
  error?: boolean;
  /** 드롭다운 사이즈, 디자인 시스템(피그마 컨벤션) */
  size: DropDownSizeType;
  /** 드롭다운 카테고리, 디자인 시스템(피그마 컨벤션) */
  category?: DropDownCategoryType;
  /** 드롭다운 가로 길이 */
  width: `${number}${WidthUnitType}` | number;
  /** Placeholder */
  placeHolder?: string;
  /** 드롭다운 label */
  label: string;
  /** 드롭다운 label 위치 */
  labelPosition?: LabelPositionType;
  /** helperText */
  helperText?: string;
  /** 드롭다운 데이터 */
  data: any[];
  /** 선택된 드롭다운 상태값 -> const [sample, setSample] = useState<string>("") */
  checkedData: { [key: string]: any } & { value: string };
  /** 선택된 드롭다운 상태값 업데이트 -> const [sample, setSample] = useState<string>("") */
  setCheckedData: React.Dispatch<React.SetStateAction<any & { value: string }>>;
}

export default function DropDown({ labelPosition = "vertical", category = "default", ...props }: IDropDownProps) {
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
  const dropDownOptionRef = useRef<HTMLDivElement>(null);

  let dropDownWidth;
  if (props.width) dropDownWidth = typeof props.width === "string" ? props.width : `${props.width}px`;

  const handleDropDownToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (props.readonly) return;

    setDropDownOpen(!dropDownOpen);

    if (dropDownOptionRef.current) dropDownOptionRef.current.focus();
  };

  return (
    <div
      className={`${props.className} ${labelPosition === "vertical" ? "flex-col gap-3" : "items-center gap-5"} flex`}
    >
      {category === "default" && (
        <DropDownLabel
          className={`${props.size === "small" && "!typo-body3-m"} typo-body2-m text-neutral-500`}
          {...props}
        />
      )}

      <div
        className="relative"
        tabIndex={0}
        ref={dropDownOptionRef}
        style={{ width: dropDownWidth }}
        onClick={handleDropDownToggle}
        onBlur={(event) => {
          event.stopPropagation();
          setDropDownOpen(false);
        }}
      >
        {/* DropDown selectedValue 영역 */}
        <DropDownSelectedValue props={props} category={category} dropDownOpen={dropDownOpen} />

        {/* DropDown Option 영역 */}
        <DropDownOption props={props} category={category} dropDownOpen={dropDownOpen}>
          {props.data?.map((data, index) => (
            <div
              key={data.index ?? index}
              className={`
                  ${props.checkedData.value === data.value && "bg-neutral-100"}
                  ${data.isDisabled ? "cursor-no-drop text-neutral-200" : "cursor-pointer text-neutral-800 hover:bg-neutral-50"}
                  typo-body2-m flex h-10 items-center px-5
                `}
              onClick={(event) => {
                event.stopPropagation();

                if (!data.isDisabled) {
                  props.setCheckedData(data);
                  setDropDownOpen(false);
                }
              }}
            >
              {data.value}
            </div>
          ))}
        </DropDownOption>

        {/* helper Text 영역 */}
        <DropDownHelperText {...props} />
      </div>
    </div>
  );
}
