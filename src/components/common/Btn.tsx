"use client";

type WidthUnitType = "px" | "%" | "em" | "vh";
type BtnCategoryType = "primary" | "secondary";
type BtnSizeType = "large" | "medium" | "small";

interface IProps {
  /** 버튼 내용(텍스트) */
  children: React.ReactNode;
  /** 버튼 카테고리, 디자인 시스템(피그마 컨벤션) */
  category: BtnCategoryType;
  /** 버튼 사이즈, 디자인 시스템(피그마 컨벤션) */
  size: BtnSizeType;
  /** 버튼 아웃라인 유무 */
  outline?: boolean;
  /** 버튼 왼쪽 아이콘 */
  startIcon?: React.ReactNode;
  /** 버튼 오른쪽 아이콘 */
  endIcon?: React.ReactNode;
  /** 버튼 가로 길이 */
  width: `${number}${WidthUnitType}` | number;
  /** 버튼 클릭 시 이벤트 동작 */
  onClick?: () => void;
}

export default function Btn(props: IProps) {
  let btnWidth;
  if (props.width) btnWidth = typeof props.width === "string" ? props.width : `${props.width}px`;

  const btnCategory: Record<BtnCategoryType, string> = {
    primary: "text-white bg-purple-500 hover:bg-purple-600 disabled:opacity-50",
    secondary: "text-white bg-navy-500 hover:bg-navy-600 disabled:opacity-50",
  };

  const outlineCategory: Record<BtnCategoryType, string> = {
    primary: "text-purple-500 border border-purple-500 bg-white hover:bg-purple-100 disabled:opacity-50",
    secondary: "text-navy-700 border border-navy-200 bg-white hover:bg-navy-100 disabled:opacity-50",
  };

  const btnSize: Record<BtnSizeType, string> = {
    large: "typo-h1 px-5 py-4 h-10 gap-3",
    medium: "typo-h2 px-5 py-3 h-9 gap-3",
    small: "typo-title1 px-5 py-3 h-8 gap-2",
  };

  return (
    <div
      className={`${props.outline ? outlineCategory[props.category] : btnCategory[props.category]} ${btnSize[props.size]} cn-center cursor-pointer rounded-3`}
      style={{ width: btnWidth }}
      onClick={props.onClick}
    >
      {props.startIcon ?? ""} {props.children} {props.endIcon ?? ""}
    </div>
  );
}
