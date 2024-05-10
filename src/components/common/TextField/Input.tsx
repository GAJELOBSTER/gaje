"use client";

// React
import { forwardRef } from "react";

// Components
import IconContainer from "@/components/common/TextField/IconContainer";
import { ITextFieldProps, TextFieldSizeType } from "@/components/common/TextField";

interface IInputProps {
  props: ITextFieldProps;
  setIsFocus: (val: boolean) => void;
}

const Input = forwardRef(function Input({ props, setIsFocus }: IInputProps, ref: React.Ref<HTMLInputElement>) {
  const inputStyle: Record<TextFieldSizeType, string> = {
    large: "gap-5 typo-body2-m",
    medium: "gap-5 typo-body2-m",
    small: "gap-4 typo-body3-m",
  };

  return (
    <div className={`${inputStyle[props.size]} flex items-center py-1`}>
      {props.startIcon && <IconContainer {...props}>{props.startIcon}</IconContainer>}
      <input
        className={`
          ${props.error ? "text-negative-500" : "text-neutral-800"}
          w-full rounded-3 border-0 bg-transparent
          placeholder-neutral-200 outline-none 
        `}
        ref={ref}
        type={props.type}
        placeholder={props.category === "fluid" ? "" : props.placeholder}
        readOnly={props.readonly}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        onClick={(e) => e.stopPropagation()}
        onFocus={() => setIsFocus(true)}
        autoComplete="one-time-code"
      />
      {props.endIcon && <IconContainer {...props}>{props.endIcon}</IconContainer>}
    </div>
  );
});

export default Input;
