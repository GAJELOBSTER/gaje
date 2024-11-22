"use client";

type BtnCategoryType = "solid" | "outlined" | "clear";
type BtnSizeType = "large" | "medium" | "small";

export interface IIconButtonProps {
  /** 버튼 내용(텍스트) */
  children: React.ReactNode;
  /** 버튼 카테고리, 디자인 시스템(피그마 컨벤션) */
  category?: BtnCategoryType;
  /** 버튼 사이즈, 디자인 시스템(피그마 컨벤션) */
  size?: BtnSizeType;
  /** 비활성 여부 */
  disabled?: boolean;
  /** 버튼 클릭 시 이벤트 동작 */
  onClick?: () => void;
}

export default function IconBtn({ category = "solid", size = "medium", ...props }: IIconButtonProps) {
  const btnCategory: Record<BtnCategoryType, string> = {
    solid: "bg-background-primary [&:not(:disabled)]:hover:bg-background-primary-hover",
    outlined: "border border-border-enabled bg-label-common [&:not(:disabled)]:hover:bg-background-secondary-weak",
    clear: "",
  };

  const btnSize: Record<BtnSizeType, string> = {
    large: "h-[40px] w-[40px] [&_svg]:h-6 [&_svg]:w-6",
    medium: "h-8 w-8 [&_svg]:h-5 [&_svg]:w-5",
    small: "h-[28px] w-[28px] [&_svg]:h-5 [&_svg]:w-5",
  };

  return (
    <button
      className={`
       ${btnCategory[category]} ${btnSize[size]}
        flex items-center justify-center rounded-[50%] disabled:cursor-no-drop disabled:opacity-50
      `}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
