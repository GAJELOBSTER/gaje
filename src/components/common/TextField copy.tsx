// "use client";

// // React
// import { useEffect, useRef, useState } from "react";

// // Components
// import InputContainer from "@/components/common/TextField/InputContainer";
// import InputBox from "@/components/common/TextField/InputBox";
// import Input from "@/components/common/TextField/Input";
// import Textarea from "@/components/common/TextField/Textarea";
// import Label from "@/components/common/TextField/Label";
// import HelperText from "@/components/common/TextField/HelperText";

// type WidthUnitType = "px" | "%" | "em" | "vh";
// export type TextFieldCategoryType = "default" | "fluid";
// export type TextFieldSizeType = "large" | "medium" | "small";

// export interface ITextFieldProps {
//   className?: string;
//   /** label */
//   label?: string;
//   /** 텍스트 필드 가로 길이 */
//   width?: `${number}${WidthUnitType}` | number;
//   /** placeholder */
//   placeholder?: string;
//   /** 텍스트 필드 안내 메시지 */
//   helperText?: string;
//   /** 텍스트 필드 카테고리, 디자인 시스템(피그마 컨벤션) */
//   category?: TextFieldCategoryType;
//   /** 텍스트 필드 사이즈, 디자인 시스템(피그마 컨벤션) */
//   size?: TextFieldSizeType;
//   /** Multiline이 아닌 경우 input 타입 */
//   type?: string;
//   /** input step */
//   step?: number;
//   /** 여러줄 사용 여부 */
//   multiline?: boolean;
//   /** 멀티라인 선택 시 최소 줄 */
//   minRows?: number;
//   /** 멀티라인 선택 시 최대 줄 */
//   maxRows?: number;
//   /** 읽기 전용 여부 */
//   readonly?: boolean;
//   /** 비활성화 여부 */
//   disabled?: boolean;
//   /** 필수 값 여부 */
//   required?: boolean;
//   /** 유효성 여부 */
//   error?: boolean;
//   /** 입력 값 */
//   value: string;
//   /** 입력란 왼쪽 아이콘 */
//   startIcon?: React.ReactNode;
//   /** 입력란 오른쪽 아이콘 */
//   endIcon?: React.ReactNode;
//   /** 입력 값 변경 이벤트 */
//   onChange: (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   /** 키보드 입력 시 이벤트 */
//   onKeyDown?: (value: React.KeyboardEvent<any>) => void;
//   /** 키보드 포커스 이벤트 */
//   onFocus?: () => void;
//   /** 키보드 포커스 아웃 이벤트 */
//   onBlur?: () => void;
//   /** 텍스트 필드 포커스 트리거 */
//   isFocusTrigger?: boolean;
// }

// export default function TextField({ category = "default", size = "medium", ...args }: ITextFieldProps) {
//   const props = { ...args, category, size };
//   const textFieldWidth = props.width ? (typeof props.width === "string" ? props.width : `${props.width}px`) : "100%";

//   const isDefault = category === "default";
//   const isFluid = category === "fluid";

//   const [isFocus, setIsFocus] = useState<boolean>(false);
//   const [isHover, setIsHover] = useState<boolean>(false);

//   const inputBoxRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const defaultTypoStyle: Record<TextFieldSizeType, string> = {
//     large: "[&_label]:typo-body2-m [&_label>span]:typo-body2-sb",
//     medium: "[&_label]:typo-body2-m [&_label>span]:typo-body2-sb",
//     small: "[&_label]:typo-body3-m [&_label>span]:typo-body3-sb",
//   };

//   const checkLabelAnimation = !isFocus && !props.value;
//   const fluidTypoStyle: Record<TextFieldSizeType, string> = {
//     large: checkLabelAnimation ? "[&_label]:typo-body2-m" : "[&_label]:typo-body3-m",
//     medium: checkLabelAnimation ? "[&_label]:typo-body2-m" : "[&_label]:typo-body3-m",
//     small: checkLabelAnimation ? "[&_label]:typo-body3-m" : "[&_label]:typo-detail-m",
//   };

//   const typoStyle: Record<TextFieldCategoryType, string> = {
//     default: defaultTypoStyle[size],
//     fluid: fluidTypoStyle[size],
//   };

//   const fluidHelperTextPaddingStyle: Record<TextFieldSizeType, string> = {
//     large: "px-5 py-3",
//     medium: "px-5 py-3",
//     small: "px-4 py-[6px]",
//   };

//   const handleInputBoxClick = (e: React.MouseEvent<HTMLElement>) => {
//     e.stopPropagation();
//     props.multiline ? textareaRef.current?.focus() : inputRef.current?.focus();
//   };

//   useEffect(() => {
//     if (!props.isFocusTrigger) return;
//     if (inputRef.current) inputRef.current.focus();
//     if (textareaRef.current) textareaRef.current.focus();
//   }, [props.isFocusTrigger]);

//   return (
//     <div
//       className={`
//         ${typoStyle[category]}
//         ${props.className}
//         ${props.disabled && "opacity-50"}
//         flex flex-col gap-3
//       `}
//       onBlur={(event: React.FocusEvent<HTMLDivElement, Element>) => {
//         event.stopPropagation();
//         props.onBlur && props.onBlur();
//       }}
//     >
//       {isDefault && (
//         <>
//           {props.label && <Label {...props} />}
//           <div className="relative" style={{ width: textFieldWidth }}>
//             <InputContainer props={props} isFocus={isFocus} isHover={isHover}>
//               <InputBox
//                 ref={inputBoxRef}
//                 props={props}
//                 onClick={handleInputBoxClick}
//                 setIsHover={setIsHover}
//                 setIsFocus={setIsFocus}
//               >
//                 {props.multiline ? (
//                   <Textarea ref={textareaRef} props={props} setIsFocus={setIsFocus} />
//                 ) : (
//                   <Input ref={inputRef} props={props} setIsFocus={setIsFocus} />
//                 )}
//               </InputBox>
//             </InputContainer>
//           </div>
//           {props.helperText && <HelperText {...props} />}
//         </>
//       )}
//       {isFluid && (
//         <>
//           <div className="relative" style={{ width: textFieldWidth }}>
//             <InputContainer props={props} isFocus={isFocus} isHover={isHover}>
//               <div className={`${!isFocus && !props.value && "[&_svg]:invisible"}`}>
//                 <InputBox
//                   ref={inputBoxRef}
//                   props={props}
//                   onClick={handleInputBoxClick}
//                   setIsHover={setIsHover}
//                   setIsFocus={setIsFocus}
//                 >
//                   <div className={`transition ${!isFocus && !props.value && "translate-y-1/2"}`}>
//                     <Label {...props} />
//                   </div>
//                   {props.multiline ? (
//                     <Textarea ref={textareaRef} props={props} setIsFocus={setIsFocus} />
//                   ) : (
//                     <Input ref={inputRef} props={props} setIsFocus={setIsFocus} />
//                   )}
//                 </InputBox>
//               </div>
//               {props.helperText && (
//                 <div className="relative">
//                   <div
//                     className={`
//                       ${isFocus && "!ml-1 w-[calc(100%-4px)]"}
//                       ${props.error && "!bg-fixed-fail"}
//                       absolute top-0 ml-[1px] h-[1px] w-[calc(100%-2px)] bg-neutral-100
//                     `}
//                   />
//                   <div className={`${fluidHelperTextPaddingStyle[size]}`}>
//                     <HelperText {...props} />
//                   </div>
//                 </div>
//               )}
//             </InputContainer>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
