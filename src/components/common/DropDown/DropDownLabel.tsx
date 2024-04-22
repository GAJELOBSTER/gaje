import { DropDownSizeType, IDropDownProps } from "@/components/common/DropDown";

export function DropDownLabel({ className, ...props }: IDropDownProps) {
  const requiredTypeStyle: Record<DropDownSizeType, string> = {
    large: "typo-body3-sb",
    medium: "typo-body3-sb",
    small: "typo-detail-sb",
  };

  return (
    <div className={`${props.error && "!text-negative-500"} ${className}`}>
      {props.label}
      {props.required && <span className={`${requiredTypeStyle[props.size]} ml-1 text-negative-500`}>*</span>}
    </div>
  );
}
