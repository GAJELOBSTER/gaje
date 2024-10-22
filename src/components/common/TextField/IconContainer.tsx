import { ITextFieldProps, TextFieldSizeType } from "@/components/common/TextField";

interface ITextFieldWithChildrenProps extends ITextFieldProps {
  children: React.ReactNode;
  size: TextFieldSizeType;
}

function IconContainer(props: ITextFieldWithChildrenProps) {
  const inputIconStyle: Record<TextFieldSizeType, string> = {
    large: "[&_svg]:h-6 [&_svg]:w-6",
    medium: "[&_svg]:h-6 [&_svg]:w-6",
    small: "[&_svg]:w-5 [&_svg]:h-5",
  };

  return (
    <div
      className={`
        ${props.error ? "[&_svg_*]:fill-negative-300" : "[&_svg_*]:fill-neutral-300"}
        ${inputIconStyle[props.size]}
      `}
      onClick={(e) => e.stopPropagation()}
      onClickCapture={(e) => props.disabled && e.stopPropagation()}
    >
      {props.children}
    </div>
  );
}

export default IconContainer;
