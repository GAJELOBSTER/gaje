import { create } from "zustand";

// Slice
import { alertSlice } from "@/store/slice/alertSlice";

// Types
import { AlertSliceType } from "@/types/state/alertType";

export const useStore = create<AlertSliceType>((...a) => ({
  ...alertSlice(...a),
}));
