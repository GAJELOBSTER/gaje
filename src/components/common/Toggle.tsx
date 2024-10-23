"use client";

type ToggleSizeType = "large" | "small";
type ToggleLabelPositionType = "top" | "left";

export interface IToggleProps {
  className?: string;
  size: ToggleSizeType;
  label?: string;
  labelPosition?: ToggleLabelPositionType;
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}

export default function Toggle({ labelPosition = "top", ...props }: IToggleProps) {
  const typoStyle: Record<ToggleSizeType, string> = {
    large: "typo-body-2-normal font-medium",
    small: "typo-caption-1 font-medium",
  };

  const thumbSizeStyle: Record<ToggleSizeType, string> = {
    large: "w-6 h-6",
    small: "w-4 h-4",
  };

  const thumbLeftStyle: Record<ToggleSizeType, string> = {
    large: "left-[calc(theme(space.10)-theme(space.6)-theme(space.1))]",
    small: "left-[calc(theme(space.8)-theme(space.4)-theme(space.1))]",
  };

  const trackSizeStyle: Record<ToggleSizeType, string> = {
    large: "w-10 h-7",
    small: "w-8 h-5",
  };

  const labelPositionStyle: Record<ToggleLabelPositionType, string> = {
    top: "gap-3 flex-col",
    left: "gap-5 items-center",
  };

  const trackBackgroundColorStyle = props.checked ? "[&>div]:bg-background-primary" : "[&>div]:bg-background-gray-bold";
  const trackHoverStyle = props.checked ? "[&>div]:hover:bg-brand-600" : "[&>div]:hover:bg-neutral-300";

  return (
    <div className={`${props.className} ${labelPositionStyle[labelPosition]} flex`}>
      {props.label && (
        <div className={`${typoStyle[props.size]} ${props.disabled && "opacity-50"} text-label-neutral`}>
          {props.label}
        </div>
      )}
      <div
        className={`
          ${props.disabled ? "cursor-not-allowed opacity-50" : `cursor-pointer ${trackHoverStyle}`}
          ${trackBackgroundColorStyle}
          relative
        `}
        onClick={() => !props.disabled && props.onChange()}
      >
        {/* Thumb */}
        <span
          className={`
            ${props.checked ? thumbLeftStyle[props.size] : "left-1"}
            ${thumbSizeStyle[props.size]}
            absolute top-1 rounded-[50%] bg-background-white transition-all
          `}
        />
        {/* Track */}
        <div className={`${trackSizeStyle[props.size]} rounded-[12px]`}></div>
      </div>
    </div>
  );
}
