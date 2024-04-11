"use client";

type WidthUnitType = "px" | "%" | "em" | "vh";
type BtnCategoryType = "primary" | "secondary";
type BtnSizeType = "large" | "medium" | "small";

export interface IButtonProps {
  /** 버튼 내용(텍스트) */
  children: React.ReactNode;
  /** 버튼 카테고리, 디자인 시스템(피그마 컨벤션) */
  category?: BtnCategoryType;
  /** 버튼 사이즈, 디자인 시스템(피그마 컨벤션) */
  size?: BtnSizeType;
  /** 버튼 아웃라인 유무 */
  outline?: boolean;
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

export default function Btn({ category = "primary", size = "medium", ...props }: IButtonProps) {
  const btnWidth = props.width ? (typeof props.width === "string" ? props.width : `${props.width}px`) : "100%";

  const btnCategory: Record<BtnCategoryType, string> = {
    primary: "text-white bg-brand-500 [&:not(:disabled)]:hover:bg-brand-600",
    secondary: "text-white bg-neutral-500 [&:not(:disabled)]:hover:bg-neutral-600",
  };

  const outlineCategory: Record<BtnCategoryType, string> = {
    primary: "text-brand-500 border-1 border-brand-500 bg-white [&:not(:disabled)]:hover:bg-brand-100",
    secondary: "text-neutral-700 border-1 border-neutral-200 bg-white [&:not(:disabled)]:hover:bg-neutral-100",
  };

  const btnSize: Record<BtnSizeType, string> = {
    large: "typo-body2-m px-5 py-4 h-10 gap-3",
    medium: "typo-body2-m px-5 py-3 h-9 gap-3",
    small: "typo-body3-m px-5 py-3 h-8 gap-2",
  };

  return (
    <button
      className={`
       ${props.outline ? outlineCategory[category] : btnCategory[category]} ${btnSize[size]}
        cn-center cursor-pointer rounded-3 disabled:cursor-no-drop disabled:opacity-50
      `}
      style={{ width: btnWidth }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.startIcon ?? ""} {props.children} {props.endIcon ?? ""}
    </button>
  );
}
