// import InteractiveBox, { IInteractiveBoxProps } from "@/components/common/InteractiveBox";

// export interface ITooltipProps extends IInteractiveBoxProps {
//   /** 툴팁 내용(텍스트) */
//   content: string;
//   /** 왼쪽 아이콘 */
//   startIcon?: React.ReactNode;
// }

// export default function Tooltip(props: ITooltipProps) {
//   const isLightColor = props.color === "light";
//   return (
//     <InteractiveBox {...props} category="tooltip">
//       <div className="cn-between gap-2">
//         {props.startIcon && <div className="flex-[0_0_16px]">{props.startIcon}</div>}
//         <div className={`${isLightColor ? "text-neutral-800" : "text-white"} typo-body3-m whitespace-pre-line`}>
//           {props.content}
//         </div>
//       </div>
//     </InteractiveBox>
//   );
// }
