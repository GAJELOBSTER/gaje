// import { DropDownCategoryType, DropDownSizeType, IDropDownProps } from "@/components/common/DropDown";
// import { DropDownLabel } from "@/components/common/DropDown/DropDownLabel";

// import DropdownDown from "@/assets/svg/DropdownDown";
// import DropdownUp from "@/assets/svg/DropdownUp";

// export interface IDropDownSelectedValueProps {
//   props: IDropDownProps;
//   category: DropDownCategoryType;
//   dropDownOpen: boolean;
//   selectedText?: string;
// }

// export function DropDownSelectedValue({ props, category, dropDownOpen, selectedText }: IDropDownSelectedValueProps) {
//   const selectedValueText = selectedText ?? props.checkedData.value;

//   const dropDownDefaultSize: Record<DropDownSizeType, string> = {
//     large: "h-10 px-5 py-4 typo-body2-m",
//     medium: "h-9 px-5 py-3 typo-body2-m",
//     small: "h-8  px-4 [6px] typo-body3-m",
//   };

//   const dropDownFluidSize: Record<DropDownSizeType, string> = {
//     large: "h-12 px-5 py-4 typo-body2-m",
//     medium: "h-11 px-5 py-3 typo-body2-m",
//     small: "h-10 px-4 py-[6px] typo-body3-m",
//   };

//   const dropDownCategory: Record<DropDownCategoryType, string> = {
//     default: dropDownDefaultSize[props.size],
//     fluid: dropDownFluidSize[props.size],
//   };

//   return (
//     <div
//       className={`
//         ${dropDownCategory[category]}
//         ${props.readonly && "!hover:outline-neutral-100 !cursor-no-drop"}
//         ${props.error && "!hover:outline-negative-500 !bg-negative-50 !outline-negative-500"}
//         ${dropDownOpen && (props.error ? "outline-2 !outline-negative-500" : "outline-2 !outline-neutral-500")}
//         ${props.backgroundClassName ? props.backgroundClassName : "bg-neutral-50"} cn-between cursor-pointer rounded-3 outline outline-1 outline-neutral-100 hover:outline-neutral-500
//       `}
//     >
//       <div className="flex-auto">
//         {category === "fluid" && (
//           <DropDownLabel
//             className={`${props.size === "small" && "!typo-detail-m"} typo-body3-m text-neutral-300`}
//             {...props}
//           />
//         )}

//         <div
//           className={`
//                 ${props.readonly && "!text-neutral-400"}
//                 ${props.error && "!text-negative-500"}
//                 ${props.placeHolder && selectedValueText === "" && "!text-neutral-200"}
//                 text-neutral-800
//               `}
//         >
//           {selectedValueText !== "" ? selectedValueText : props.placeHolder ? props.placeHolder : ""}
//         </div>
//       </div>

//       <div
//         className={`
//           ${props.readonly && "[&_path]:!fill-neutral-400"}
//           ${props.error && "[&_path]:!fill-negative-500"}
//           flex-[0_0_20px] [&_path]:fill-neutral-800
//         `}
//       >
//         {dropDownOpen ? <DropdownUp /> : <DropdownDown />}
//       </div>
//     </div>
//   );
// }
