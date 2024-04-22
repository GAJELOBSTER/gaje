"use client";

import { SubBtnType } from "@/components/common/AlertModal";
import { useBoundStore } from "@/store";

export default function useAlert(subBtn?: SubBtnType) {
  const open = useBoundStore((state) => state.openAlertModal);
  const close = useBoundStore((state) => state.closeAlertModal);

  const closeAlert = () => close();
  const openAlert = (title: string, contents: string) => open(title, contents, subBtn);

  return {
    openAlert,
    closeAlert,
  };
}
