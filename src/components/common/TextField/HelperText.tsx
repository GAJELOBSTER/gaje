// Assets
import ErrorOn from "@/assets/svg/ErrorOn";

// componenets
import { ITextFieldProps, TextFieldSizeType } from "@/components/common/TextField";

function HelperText(props: ITextFieldProps) {
  const helperTextStyle: Record<TextFieldSizeType, string> = {
    large: "typo-body3-r [&_svg]:h-5 [&_svg]:w-5",
    medium: "typo-body3-r [&_svg]:h-5 [&_svg]:w-5",
    small: "typo-detail-m [&_svg]:h-4 [&_svg]:w-4",
  };

  return (
    <p
      className={`
        ${props.error ? "text-negative-500" : "text-neutral-400"}
        ${helperTextStyle[props.size]}
        flex items-center gap-2
      `}
    >
      {props.error && <ErrorOn />}
      {props.helperText}
    </p>
  );
}

export default HelperText;
