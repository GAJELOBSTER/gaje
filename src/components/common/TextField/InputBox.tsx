// "use client";

// import { ITextFieldProps, TextFieldSizeType } from "@/components/common/TextField";
// import { forwardRef } from "react";

// interface IInputBoxProps {
//   props: ITextFieldProps;
//   children: React.ReactNode;
//   onClick: (e: React.MouseEvent<HTMLElement>) => void;
//   setIsHover: (val: boolean) => void;
//   setIsFocus: (val: boolean) => void;
// }

// const InputBox = forwardRef(function InputBox(
//   { props, children, onClick, setIsHover, setIsFocus }: IInputBoxProps,
//   ref: React.Ref<HTMLDivElement>,
// ) {
//   const inputPaddingStyle: Record<TextFieldSizeType, string> = {
//     large: "px-5 py-4",
//     medium: "px-5 py-3",
//     small: "px-4 py-[6px]",
//   };

//   return (
//     <div
//       ref={ref}
//       className={`${inputPaddingStyle[props.size]} cursor-text outline-none`}
//       onClick={onClick}
//       tabIndex={0}
//       onFocus={() => !props.disabled && setIsFocus(true)}
//       onBlur={() => setIsFocus(false)}
//       onMouseEnter={() => setIsHover(true)}
//       onMouseLeave={() => setIsHover(false)}
//     >
//       {children}
//     </div>
//   );
// });

// export default InputBox;
