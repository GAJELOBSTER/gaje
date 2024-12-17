type LableSizeType = "small" | "medium" | "large";

export interface ILabelProps {
  /** 레이블 값 */
  text: string;
  /** 레이블 사이즈, 디자인 시스템(피그마 컨벤션) */
  size?: LableSizeType;
  /** 비활성 여부 */
  disabled?: boolean;
  /** 필수 여부 */
  required?: boolean;
}

export default function Label({ size = "medium", ...props }: ILabelProps) {
  const labelSize: Record<LableSizeType, string> = {
    large: "typo-caption-1 font-medium",
    medium: "typo-body-2-normal font-mediu,",
    small: "typo-body-2-normal font-medium",
  };

  return (
    <div
      className={`
      ${labelSize[size]} flex gap-1 align-baseline
      ${props.disabled ? "text-label-disabled" : "text-label-neutral"}
      ${props.required && "after:block after:h-2 after:w-2 after:rounded-[50%] after:bg-background-negative after:content-['']"}
    `}
    >
      {props.text}
    </div>
  );
}
