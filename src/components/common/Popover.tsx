import InteractiveBox, { IInteractiveBoxProps } from "@/components/common/InteractiveBox";

export interface IPopoverProps extends IInteractiveBoxProps {
  /** 팝오버 타이틀 */
  title: string;
  /** 팝오버 내용(텍스트) */
  content: string;
  /** 팝오버 하단 Action 영역 */
  optionalAction: React.ReactNode;
}

export default function Popover(props: IPopoverProps) {
  const isLightColor = props.color === "light";
  return (
    <InteractiveBox {...props} category="popover">
      <div className="relative">
        <div className={`${isLightColor ? "text-neutral-800" : "text-white"} typo-body2-m mb-2`}>{props.title}</div>
        <div className={`${isLightColor ? "text-neutral-400" : "text-neutral-200"} typo-body3-r whitespace-pre-line`}>
          {props.content}
        </div>
        {props.optionalAction ?? ""}
      </div>
    </InteractiveBox>
  );
}
