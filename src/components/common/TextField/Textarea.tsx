// "use client";

// // React
// import { forwardRef } from "react";
// import TextareaAutosizeProps from "react-textarea-autosize";

// // Components
// import IconContainer from "@/components/common/TextField/IconContainer";
// import { ITextFieldProps, TextFieldSizeType } from "@/components/common/TextField";

// interface ITextareaProps {
//   props: ITextFieldProps;
//   setIsFocus: (val: boolean) => void;
// }

// const Textarea = forwardRef(function Input({ props, setIsFocus }: ITextareaProps, ref: React.Ref<HTMLTextAreaElement>) {
//   const inputStyle: Record<TextFieldSizeType, string> = {
//     large: "gap-5 typo-body2-m",
//     medium: "gap-5 typo-body2-m",
//     small: "gap-4 typo-body3-m",
//   };

//   return (
//     <div className={`${inputStyle[props.size]} flex items-center`}>
//       {props.startIcon && <IconContainer {...props}>{props.startIcon}</IconContainer>}
//       <TextareaAutosizeProps
//         className={`
//           ${props.error ? "text-negative-500" : "text-neutral-800"}
//           w-full resize-none rounded-3 border-0 bg-transparent py-1
//           placeholder-neutral-200 outline-none disabled:cursor-not-allowed
//         `}
//         ref={ref}
//         placeholder={props.category === "fluid" ? "" : props.placeholder}
//         readOnly={props.readonly}
//         value={props.value}
//         disabled={props.disabled}
//         onChange={props.onChange}
//         onKeyDown={props.onKeyDown}
//         onClick={(e) => e.stopPropagation()}
//         onFocus={() => setIsFocus(true)}
//       />
//       {props.endIcon && <IconContainer {...props}>{props.endIcon}</IconContainer>}
//     </div>
//   );
// });

// export default Textarea;
