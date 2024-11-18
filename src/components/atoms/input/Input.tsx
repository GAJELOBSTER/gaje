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

export interface ITextFieldProps {}

export default function Input() {
  return (
    <>
      {/* <input
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
/> */}
      <input></input>
    </>
  );
}
