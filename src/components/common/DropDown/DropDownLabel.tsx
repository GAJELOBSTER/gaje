import { IDropDownProps } from "@/components/common/DropDown";

export function DropDownLabel({ className, ...props }: IDropDownProps) {
  return <div className={`${props.error && "!text-negative-500"} ${className}`}>{props.label}</div>;
}
