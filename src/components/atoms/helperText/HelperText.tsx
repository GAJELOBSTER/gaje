type LableSizeType = "small" | "medium" | "large";

export interface IHelperTextProsp {
  /** 헬퍼텍스트 값 */
  text: string;
  /** 헬퍼텍스트 사이즈, 디자인 시스템(피그마 컨벤션) */
  size?: LableSizeType;
  /** 비활성 여부 */
  disabled?: boolean;
  /** 에러 여부 */
  error?: boolean;
}

export default function HelperText({ size = "medium", ...props }: IHelperTextProsp) {
  const labelSize: Record<LableSizeType, string> = {
    large: "typo-body-2-normal font-medium",
    medium: "typo-body-2-normal font-mediu,",
    small: "typo-caption-1 font-medium",
  };

  return (
    <div
      className={`
      ${labelSize[size]} 
      ${props.disabled ? "text-label-disabled" : props.error ? "text-label-negative" : "text-label-neutral"}
    `}
    >
      {props.text}
    </div>
  );
}
