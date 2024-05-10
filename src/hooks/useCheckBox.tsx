"use client";

import { useState } from "react";
import { checkBoxObjectType } from "@/components/common/CheckBox";

export default function useCheckBox(data: any[]) {
  const [checkBoxStateList, setCheckBoxStateList] = useState<checkBoxObjectType>(
    data.reduce((pre, _, index) => ({ ...pre, [index]: false }), {}),
  );

  const initCheckBoxState = () =>
    setCheckBoxStateList(data.reduce((pre, _, index) => ({ ...pre, [index]: false }), {}));

  return { checkBoxStateList, setCheckBoxStateList, initCheckBoxState };
}
