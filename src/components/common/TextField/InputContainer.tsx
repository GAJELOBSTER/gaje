import { ITextFieldProps, TextFieldSizeType } from "@/components/common/TextField";

interface IInputContainerProps {
  props: ITextFieldProps;
  children: React.ReactNode;
  isFocus: boolean;
  isHover: boolean;
}

function InputContainer({ props, isFocus, isHover, children }: IInputContainerProps) {
  const inputContainerStyle: Record<TextFieldSizeType, string> = {
    large: "min-h-10 gap-5",
    medium: "min-h-9 gap-5",
    small: "min-h-8 gap-4",
  };

  return (
    <div
      className={`
        ${inputContainerStyle[props.size]}
        ${props.disabled && "[&_*]:!cursor-not-allowed"}
        ${props.error && "!bg-negative-50 !outline-negative-500"}
        ${props.readonly && !props.error && "!bg-neutral-50"}
        ${!props.disabled && isFocus && (props.error ? "!outline-2" : "!outline-2 !outline-neutral-500")}
        ${!props.disabled && isHover && (props.error ? "" : "!outline-neutral-500")}
        rounded-3 outline outline-1 outline-neutral-100
      `}
    >
      {children}
    </div>
  );
}

export default InputContainer;
