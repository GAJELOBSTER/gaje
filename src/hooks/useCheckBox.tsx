"use client";

import { useState } from "react";
import { checkBoxObjectType } from "@/components/common/CheckBox";

type UseCheckBoxReturnType = [
  /** checkBox 데이터 상태 리스트 */
  checkBoxStateList: checkBoxObjectType,
  /** checkBox 데이터 상태 리스트업데이트 */
  setCheckBoxStateList: React.Dispatch<React.SetStateAction<checkBoxObjectType>>,
];

export default function useCheckBox(data: any[]): Readonly<UseCheckBoxReturnType> {
  const [checkBoxStateList, setCheckBoxStateList] = useState<checkBoxObjectType>(
    data.reduce((pre, _, index) => ({ ...pre, [index]: false }), {}),
  );

  return [checkBoxStateList, setCheckBoxStateList];
}
