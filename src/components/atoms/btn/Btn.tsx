"use client";

type WidthUnitType = "px" | "%" | "em" | "vh";
type BtnCategoryType = "primary" | "secondary" | "negative" | "text";
type BtnSizeType = "large" | "medium" | "small";

export interface IBtnProps {
  /** 버튼 내용(텍스트) */
  children: React.ReactNode;
  /** 버튼 카테고리, 디자인 시스템(피그마 컨벤션) */
  category?: BtnCategoryType;
  /** 버튼 사이즈, 디자인 시스템(피그마 컨벤션) */
  size?: BtnSizeType;
  /** 버튼 아웃라인 유무 및 text타입 색 */
  variant?: boolean;
  /** 버튼 왼쪽 아이콘 */
  startIcon?: React.ReactNode;
  /** 버튼 오른쪽 아이콘 */
  endIcon?: React.ReactNode;
  /** 버튼 가로 길이 */
  width?: `${number}${WidthUnitType}` | number;
  /** 비활성 여부 */
  disabled?: boolean;
  /** 버튼 클릭 시 이벤트 동작 */
  onClick?: () => void;
}

export default function Btn({ category = "primary", size = "medium", ...props }: IBtnProps) {
  const btnWidth = props.width ? (typeof props.width === "string" ? props.width : `${props.width}px`) : "auto";

  const btnCategory: Record<BtnCategoryType, string> = {
    primary: "text-label-common bg-background-primary [&:not(:disabled)]:hover:bg-background-primary-hover",
    secondary: "text-label-common bg-background-secondary [&:not(:disabled)]:hover:bg-background-secondary-hover",
    negative: "text-label-common bg-background-negative [&:not(:disabled)]:hover:bg-background-negative-hover",
    text: "text-label-normal [&:not(:disabled)]:hover:underline",
  };

  const variantCategory: Record<BtnCategoryType, string> = {
    primary:
      "text-background-primary border-1 border-background-primary bg-label-common [&:not(:disabled)]:hover:bg-background-primary-weak",
    secondary:
      "text-label-secondary border-1 border-border-enabled bg-label-common [&:not(:disabled)]:hover:bg-background-secondary-weak",
    negative:
      "text-label-negative border-1 border-boder-negative bg-label-common [&:not(:disabled)]:hover:bg-background-negative-weak",
    text: "text-background-primary [&:not(:disabled)]:hover:text-background-primary-hover [&:not(:disabled)]:hover:underline",
  };

  const btnSize: Record<BtnSizeType, string> = {
    large: "typo-body-1-normal font-medium h-10 px-5 py-4",
    medium: "typo-body-2-normal font-medium h-[40px] py-3 px-4",
    small: "typo-caption-1 font-medium h-8 px-4 py-3",
  };

  return (
    <button
      className={`
       ${props.variant ? variantCategory[category] : btnCategory[category]} ${btnSize[size]}
        cn-center cursor-pointer rounded-4 disabled:cursor-no-drop
        disabled:opacity-50
      `}
      style={{ width: btnWidth }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.startIcon ?? ""} {props.children} {props.endIcon ?? ""}
    </button>
  );
}
