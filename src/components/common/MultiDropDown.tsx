// "use client";

// import { useEffect, useRef, useState } from "react";

// import { IDropDownProps } from "@/components/common/DropDown";
// import { DropDownHelperText } from "@/components/common/DropDown/DropDownHelperText";
// import { DropDownOption } from "@/components/common/DropDown/DropDownOption";
// import { DropDownSelectedValue } from "@/components/common/DropDown/DropDownSelectedValue";
// import { DropDownLabel } from "@/components/common/DropDown/DropDownLabel";

// import CheckBox, { checkBoxObjectType } from "@/components/common/CheckBox";

// export interface IMultiDropDownProps extends IDropDownProps {
//   /** checkBox 데이터 상태 리스트 */
//   checkBoxStateList: checkBoxObjectType;
//   /** checkBox 데이터 상태 리스트업데이트 */
//   setCheckBoxStateList: React.Dispatch<React.SetStateAction<checkBoxObjectType>>;
// }

// export default function MultiDropDown({
//   labelPosition = "vertical",
//   category = "default",
//   ...props
// }: IMultiDropDownProps) {
//   const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
//   const [selectedValueIndex, setSlectedValueIndex] = useState(new Set<number>());
//   const [selectedText, setSelectedText] = useState("");

//   const updateSelectedValueIndex = new Set<number>(selectedValueIndex);
//   const dropDownOptionRef = useRef<HTMLDivElement>(null);

//   let dropDownWidth;
//   if (props.width) dropDownWidth = typeof props.width === "string" ? props.width : `${props.width}px`;

//   const handleDropDownToggle = (event: React.MouseEvent<HTMLDivElement>) => {
//     event.preventDefault();

//     if (props.readonly) return;

//     setDropDownOpen(!dropDownOpen);

//     if (dropDownOptionRef.current) dropDownOptionRef.current.focus();
//   };

//   const findSelectedValue = () => {
//     Object.values(props.checkBoxStateList).forEach((data, index) => {
//       if (data === true) return updateSelectedValueIndex.add(index);
//       if (data === false && updateSelectedValueIndex.has(index)) return updateSelectedValueIndex.delete(index);
//     });

//     setSlectedValueIndex(updateSelectedValueIndex);

//     if (updateSelectedValueIndex.size > 0) {
//       const firstSelectedIndex = [...updateSelectedValueIndex][0];
//       const selectedListlength = updateSelectedValueIndex.size;

//       if (updateSelectedValueIndex.size === 1) return `${props.data[firstSelectedIndex].value}`;

//       return `${props.data[firstSelectedIndex].value} 외 ${selectedListlength - 1}`;
//     }
//   };

//   useEffect(() => {
//     setSelectedText(findSelectedValue() || "");
//   }, [props.checkBoxStateList]);

//   return (
//     <div
//       className={`${props.className} ${labelPosition === "vertical" ? "flex-col gap-3" : "items-center gap-5"} flex`}
//     >
//       {category === "default" && (
//         <DropDownLabel
//           className={`${props.size === "small" && "!typo-body3-m"} typo-body2-m text-neutral-500`}
//           {...props}
//         />
//       )}

//       <div
//         className="relative"
//         tabIndex={0}
//         ref={dropDownOptionRef}
//         style={{ width: dropDownWidth }}
//         onClick={handleDropDownToggle}
//         onBlur={(event) => {
//           event.stopPropagation();
//           setDropDownOpen(false);
//         }}
//       >
//         {/* DropDown selectedValue 영역 */}
//         <DropDownSelectedValue
//           props={props}
//           category={category}
//           dropDownOpen={dropDownOpen}
//           selectedText={selectedText}
//         />

//         {/* DropDown option 영역 */}
//         <DropDownOption props={props} category={category} dropDownOpen={dropDownOpen}>
//           {props.data.map((data, index) => (
//             <CheckBox
//               className={`
//                   ${data.isDisabled ? "cursor-no-drop text-neutral-200" : "cursor-pointer text-neutral-800 hover:bg-neutral-50"}
//                   typo-body2-m flex h-10 items-center px-5
//                 `}
//               key={data.index ?? index}
//               label={data.value}
//               value={index}
//               disabled={data.isDisabled}
//               checkBoxStateList={props.checkBoxStateList}
//               setCheckBoxStateList={props.setCheckBoxStateList}
//             />
//           ))}
//         </DropDownOption>

//         {/* helper Text 영역 */}
//         <DropDownHelperText {...props} />
//       </div>
//     </div>
//   );
// }
