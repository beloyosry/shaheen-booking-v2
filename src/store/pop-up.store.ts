import { create } from "zustand";
import type { PopupData } from "../types";

type PopupState = {
    popupVisible: PopupData;
    setPopupVisible: (data: PopupData) => void;
};

export const usePopupStore = create<PopupState>((set) => ({
    popupVisible: {
        visible: false,
        success: false,
        message: "",
        title: "",
    },
    setPopupVisible: (data: PopupData) => set({ popupVisible: data }),
}));
