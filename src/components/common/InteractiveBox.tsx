"use client";

import PopoverCloseIcon from "@/assets/svg/PopoverCloseIcon";
import { PopoverTip } from "@/assets/svg/PopoverTip";

type InteractiveBoxCategoryType = "tooltip" | "popover";
export type PopoverColorType = "light" | "dark";
export type ColorType = PopoverColorType | "positive" | "negative" | "warning";
export type ArrowDirectionType = "top" | "left" | "bottom" | "right";

export interface IInteractiveBoxProps {
  /** 대화상자 컬러 */
  color: ColorType;
  /** 우측 Close 버튼 유무 */
  showCloseBtn?: boolean;
  /** 대화 상자 위치 포지션 */
  position: {
    x: number;
    y: number;
  };
  /** 화살표 방향 */
  arrowDirection: ArrowDirectionType;
  /** 화살표 위치 포지션 */
  arrowPosition: number;
  /** 대화 상자 노출 여부 */
  isOpen: boolean;
  /** 대화 상자 닫기 */
  onClose: () => void;
}

interface Props extends IInteractiveBoxProps {
  className?: string;
  /** 대화 상자 내용 */
  children: React.ReactNode;
  /** 대화 상자 카테고리, 디자인 시스템(피그마 컨벤션) */
  category: InteractiveBoxCategoryType;
}

export default function InteractiveBox(props: Props) {
  const popoverCategory: Record<InteractiveBoxCategoryType, string> = {
    tooltip: "py-3 px-4 typo-body3-m",
    popover: "py-4 px-5 typo-body3-r",
  };

  const colorCategory: Record<ColorType, string> = {
    light: "bg-white text-neutral-800",
    dark: "bg-neutral-900 text-white",
    positive: "bg-positive-500 text-white",
    negative: "bg-negative-600 text-white",
    warning: "bg-warning-500 text-white",
  };

  const popoverTipColor: Record<ColorType, string> = {
    light: "fill-white",
    dark: "fill-neutral-900",
    positive: "fill-positive-500",
    negative: "fill-negative-600",
    warning: "fill-warning-500",
  };

  const direction: Record<ArrowDirectionType, string> = {
    top: "top-[-6px] rotate-180",
    left: "left-[-7px] rotate-90",
    bottom: `${"bottom-[-6px]"}`,
    right: "right-[-8px] rotate-[270deg]",
  };

  return (
    props.isOpen && (
      <div>
        <div
          className={`
            ${props.className} ${colorCategory[props.color]} ${popoverCategory[props.category]}
            absolute w-max rounded-3 drop-shadow-[0_4px_16px_rgba(102,102,102,0.16)]
          `}
          style={{
            transform:
              props.arrowDirection === "bottom" || props.arrowDirection === "top"
                ? `translateX(${props.position.x - props.arrowPosition}px) translateY(${props.position.y}px)`
                : `translateX(${props.position.x}px) translateY(${props.position.y - props.arrowPosition}px)`,
          }}
        >
          <div className="cn-between items-start gap-3">
            {props.children}
            {props.showCloseBtn && (
              <div className="flex-[0_0_16px] cursor-pointer" onClick={props.onClose}>
                <PopoverCloseIcon className={`${props.color === "light" ? "fill-neutral-800" : "fill-white"}`} />
              </div>
            )}
          </div>

          <div
            className={`${direction[props.arrowDirection]} absolute`}
            style={
              props.arrowDirection === "bottom" || props.arrowDirection === "top"
                ? { left: `${props.arrowPosition}px` }
                : { top: `${props.arrowPosition}px` }
            }
          >
            <PopoverTip className={`${popoverTipColor[props.color]}`} />
          </div>
        </div>
      </div>
    )
  );
}
