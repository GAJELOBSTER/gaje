// import { DropDownCategoryType, DropDownSizeType, IDropDownProps } from "@/components/common/DropDown";

// export interface IDropDownOptionProps {
//   props: IDropDownProps;
//   children: React.ReactNode;
//   category: DropDownCategoryType;
//   dropDownOpen: boolean;
// }

// export function DropDownOption({ props, children, category, dropDownOpen }: IDropDownOptionProps) {
//   const dropDownDefaultSize: Record<DropDownSizeType, string> = {
//     large: "top-10 max-h-[264px] [&>div]:h-10",
//     medium: "top-9 max-h-[220px] [&>div]:h-9",
//     small: "top-8 max-h-[220px] [&>div]:h-9",
//   };

//   const dropDownFluidSize: Record<DropDownSizeType, string> = {
//     large: "top-12 max-h-[264px] [&>div]:h-10",
//     medium: "top-11 max-h-[220px] [&>div]:h-9",
//     small: "top-10 max-h-[220px] [&>div]:h-9",
//   };

//   const dropDownOptionCategory: Record<DropDownCategoryType, string> = {
//     default: dropDownDefaultSize[props.size],
//     fluid: dropDownFluidSize[props.size],
//   };

//   return (
//     <div
//       className={`
//         ${dropDownOptionCategory[category]}
//         ${!dropDownOpen && "hidden"}
//         absolute z-10 mt-2 w-full overflow-y-auto rounded-3 border-1 border-neutral-100 bg-white drop-shadow-[4px_4px_20px_rgba(40,42,50,0.08)]
//       `}
//     >
//       {children}
//     </div>
//   );
// }
