"use client";

// React
import { useState } from "react";

type WidthUnitType = "px" | "%" | "em" | "vh";
export type InputSizeType = "large" | "medium" | "small";

export interface IInputProps {
  className?: string;
  /** 인풋 가로 길이 */
  width?: `${number}${WidthUnitType}` | number;
  /** 인풋 사이즈, 디자인 시스템(피그마 컨벤션) */
  size?: InputSizeType;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 유효성 여부 */
  error?: boolean;
  /** 입력 값 */
  value: string;
  /** placeholder */
  placeholder?: string;
  /** 입력 값 변경 이벤트 */
  onChange: (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 키보드 입력 시 이벤트 */
  onKeyDown?: (value: React.KeyboardEvent<any>) => void;
  /** 키보드 포커스 이벤트 */
  onFocus?: () => void;
  /** 키보드 포커스 아웃 이벤트 */
  onBlur?: () => void;
}

export default function Input({ size = "medium", ...args }: IInputProps) {
  const props = { ...args, size };

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const inputWidth = props.width ? (typeof props.width === "string" ? props.width : `${props.width}px`) : "100%";

  const textSize: Record<InputSizeType, string> = {
    large: "typo-body-1-normal font-medium",
    medium: "typo-body-2-normal font-medium",
    small: "typo-caption-1 font-medium",
  };

  const inputType: Record<InputSizeType, string> = {
    large: `px-6 h-10 ${textSize["large"]}`,
    medium: `px-6 h-[40px] ${textSize["medium"]}`,
    small: `px-4 h-8 ${textSize["small"]}`,
  };

  return (
    <div
      className={`
      ${isFocus && "outline-2 outline-border-primary"}
      ${props.error && "!outline-border-negative"}
      ${props.disabled ? "!outline-border-week placeholder:text-label-disabled" : "hover:outline-border-primary"} 
      flex w-full  items-center gap-3 overflow-hidden rounded-4 outline outline-1 outline-border-enabled
    `}
      style={{ width: inputWidth }}
    >
      <input
        className={`
            ${inputType[size]} 
            w-full !bg-background-white outline-none placeholder:text-label-assistant disabled:text-label-disabled
        `}
        placeholder={props.placeholder}
        disabled={props.disabled}
        value={props.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        onClick={(e) => e.stopPropagation()}
      />
      {/* {props.endIcon && <IconContainer {...props}>{props.endIcon}</IconContainer>} */}
    </div>
  );
}
