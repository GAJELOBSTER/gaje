"use client";

// React
import { useCallback, useEffect, useRef, useState } from "react";
import TextareaAutosizeProps from "react-textarea-autosize";

// Components
import IconContainer from "@/components/common/TextField/IconContainer";
// import InputContainer from "@/components/common/TextField/InputContainer";
// import InputBox from "@/components/common/TextField/InputBox";
// import Input from "@/components/common/TextField/Input";
// import Textarea from "@/components/common/TextField/Textarea";
// import Label from "@/components/common/TextField/Label";
// import HelperText from "@/components/common/TextField/HelperText";

type WidthUnitType = "px" | "%" | "em" | "vh";
export type TextFieldSizeType = "large" | "medium" | "small";

export interface ITextFieldProps {
  className?: string;
  /** label */
  label?: string;
  /** 텍스트 필드 가로 길이 */
  width?: `${number}${WidthUnitType}` | number;
  /** placeholder */
  placeholder?: string;
  /** 텍스트 필드 안내 메시지 */
  helperText?: string;
  /** 텍스트 필드 사이즈, 디자인 시스템(피그마 컨벤션) */
  size?: TextFieldSizeType;
  /** Multiline이 아닌 경우 input 타입 */
  type?: string;
  /** input step */
  step?: number;
  /** 여러줄 사용 여부 */
  multiline?: boolean;
  /** 멀티라인 선택 시 최소 줄 */
  minRows?: number;
  /** 멀티라인 선택 시 최대 줄 */
  maxRows?: number;
  /** 읽기 전용 여부 */
  readonly?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 필수 값 여부 */
  required?: boolean;
  /** 유효성 여부 */
  error?: boolean;
  /** 입력 값 */
  value: string;
  /** 입력란 왼쪽 아이콘 */
  startIcon?: React.ReactNode;
  /** 입력란 오른쪽 아이콘 */
  endIcon?: React.ReactNode;
  /** 입력 값 변경 이벤트 */
  onChange: (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  /** 키보드 입력 시 이벤트 */
  onKeyDown?: (value: React.KeyboardEvent<any>) => void;
  /** 키보드 포커스 이벤트 */
  onFocus?: () => void;
  /** 키보드 포커스 아웃 이벤트 */
  onBlur?: () => void;
  /** 텍스트 필드 포커스 트리거 */
  isFocusTrigger?: boolean;
}

export default function TextField({ size = "medium", ...args }: ITextFieldProps) {
  const props = { ...args, size };
  const textFieldWidth = props.width ? (typeof props.width === "string" ? props.width : `${props.width}px`) : "100%";

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);

  // const inputBoxRef = useRef<HTMLDivElement>(null);
  // const inputRef = useRef<HTMLInputElement>(null);
  // const textareaRef = useRef<HTMLTextAreaElement>(null);

  const textSize: Record<TextFieldSizeType, string> = {
    large: "typo-body-1-normal font-medium",
    medium: "typo-body-2-normal font-medium",
    small: "typo-caption-1 font-medium",
  };

  const textFieldType: Record<TextFieldSizeType, string> = {
    large: `px-6 min-h-10 ${textSize["large"]}`,
    medium: `px-6 min-h-[40px] ${textSize["medium"]}`,
    small: `px-4 min-h-8 ${textSize["small"]}`,
  };

  const inputType: Record<TextFieldSizeType, string> = {
    large: `h-10 ${textSize["large"]}`,
    medium: `h-[40px] ${textSize["medium"]}`,
    small: `h-8 ${textSize["small"]}`,
  };

  const textareaType: Record<TextFieldSizeType, string> = {
    large: `py-4 ${textSize["large"]}`,
    medium: `py-3 ${textSize["medium"]}`,
    small: `py-3 ${textSize["small"]}`,
  };

  // const handleInputBoxClick = (e: React.MouseEvent<HTMLElement>) => {
  //   e.stopPropagation();
  //   props.multiline ? textareaRef.current?.focus() : inputRef.current?.focus();
  // };

  // useEffect(() => {
  //   if (!props.isFocusTrigger) return;
  //   if (inputRef.current) inputRef.current.focus();
  //   if (textareaRef.current) textareaRef.current.focus();
  // }, [props.isFocusTrigger]);

  return (
    <div
      className={`
        ${props.className}
        ${props.disabled && "[&_div]:!text-label-disabled [&_input]:placeholder:!text-label-disabled"}
      `}
      onBlur={(event: React.FocusEvent<HTMLDivElement, Element>) => {
        event.stopPropagation();
        props.onBlur && props.onBlur();
      }}
    >
      {props.label && <div className={`${textSize[size]} mb-[6px] text-label-neutral`}>{props.label}</div>}
      <div
        className={`
          ${textFieldType[size]} 
          ${isFocus && "outline-2s outline-border-primary"}
          ${props.multiline ? "items-baseline" : "items-center"}
          ${props.error && "!outline-border-negative"}
          ${props.disabled ? "!outline-border-week" : "hover:outline-border-primary"} 
          flex w-full  gap-3 overflow-hidden rounded-4 outline outline-1 outline-border-enabled
        `}
        style={{ width: textFieldWidth }}
      >
        {props.multiline ? (
          <>
            <TextareaAutosizeProps
              className={`
              ${textareaType[size]} w-full
              resize-none !bg-background-white outline-none placeholder:text-label-assistant
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
            {props.endIcon && <IconContainer {...props}>{props.endIcon}</IconContainer>}
          </>
        ) : (
          <>
            <input
              className={`
              ${inputType[size]} 
              w-full !bg-background-white outline-none placeholder:text-label-assistant
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
            {props.endIcon && <IconContainer {...props}>{props.endIcon}</IconContainer>}
          </>
        )}
      </div>
      {props.helperText && (
        <div className={`${textSize[size]} ${props.error ? "text-label-negative" : "text-label-assistant"} mt-3`}>
          {props.helperText}
        </div>
      )}
    </div>
  );
}
