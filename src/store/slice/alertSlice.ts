import { StateCreator } from "zustand";

import { AlertSliceType } from "@/types/state/alertType";

export const alertSlice: StateCreator<AlertSliceType> = (set) => ({
  alertData: {
    title: "",
    contents: "",
    subBtn: undefined,
  },
  isOpenAlertModal: false,
  openAlertModal: (title, contents, subBtn) =>
    set(() => ({ isOpenAlertModal: true, alertData: { title, contents, subBtn } })),
  closeAlertModal: () => set(() => ({ isOpenAlertModal: false })),
});
