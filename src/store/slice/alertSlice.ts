import { StateCreator } from "zustand";

import { AlertSliceType, AlertStateType } from "@/types/state/alertType";

const states: AlertStateType = {
  alertData: {
    title: "",
    contents: "",
    subBtn: undefined,
  },
  isOpenAlertModal: false,
};

export const alertSlice: StateCreator<AlertSliceType> = (set) => ({
  ...states,
  openAlertModal: (title, contents, subBtn) =>
    set(() => ({ isOpenAlertModal: true, alertData: { title, contents, subBtn } })),
  closeAlertModal: () => set(() => ({ isOpenAlertModal: false })),
});
