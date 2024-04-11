import { ITextFieldProps, TextFieldCategoryType, TextFieldSizeType } from "@/components/common/TextField";

function Label({ category = "default", ...props }: ITextFieldProps) {
  const requiredTypeStyle: Record<TextFieldSizeType, string> = {
    large: "typo-body3-sb",
    medium: "typo-body3-sb",
    small: "typo-detail-sb",
  };

  const fontColorStyle: Record<TextFieldCategoryType, string> = {
    default: props.error ? "text-negative-500" : "text-neutral-600",
    fluid: props.error ? "text-negative-300" : "text-neutral-300",
  };

  return (
    <label className={`${fontColorStyle[category]} relative transition-[font-size]`}>
      {props.label}
      {props.required && <span className={`${requiredTypeStyle[props.size]} ml-1 text-negative-500`}>*</span>}
    </label>
  );
}

export default Label;
