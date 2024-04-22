import { create } from "zustand";

// Slice
import { alertSlice } from "@/store/slice/alertSlice";

// Types
import { AlertSliceType } from "@/types/state/alertType";

export const useBoundStore = create<AlertSliceType>((...a) => ({
  ...alertSlice(...a),
}));
