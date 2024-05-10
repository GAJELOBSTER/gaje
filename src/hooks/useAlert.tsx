"use client";

import { SubBtnType } from "@/components/common/AlertModal";
import { useStore } from "@/store";

export default function useAlert(subBtn?: SubBtnType) {
  const open = useStore((state) => state.openAlertModal);
  const close = useStore((state) => state.closeAlertModal);

  const closeAlert = () => close();
  const openAlert = (title: string, contents: string | React.ReactNode) => open(title, contents, subBtn);

  return {
    openAlert,
    closeAlert,
  };
}
