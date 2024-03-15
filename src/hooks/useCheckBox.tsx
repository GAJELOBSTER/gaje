"use client";

import { checkBoxObjectType } from "@/components/common/CheckBox";
import { useEffect, useState } from "react";

type TestReturnType = [
  /** checkBox 데이터 상태 리스트 */
  checkBoxStateList: checkBoxObjectType,
  /** checkBox 데이터 상태 리스트업데이트 */
  setCheckBoxStateList: React.Dispatch<React.SetStateAction<checkBoxObjectType>>,
];

export default function useCheckBox(data: any[]): Readonly<TestReturnType> {
  const [checkBoxStateList, setCheckBoxStateList] = useState<checkBoxObjectType>({});

  useEffect(() => {
    if (!data) return;
    setCheckBoxStateList(data.reduce((pre, _, index) => ({ ...pre, [index]: false }), {}));
  }, []);

  return [checkBoxStateList, setCheckBoxStateList];
}
