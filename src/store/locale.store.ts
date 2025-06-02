import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LocaleState = {
    locale: string;
    setLocale: (locale: string) => void;
};

export const localeStore = create<LocaleState>()(
    persist(
        (set) => ({
            locale: "ar",
            setLocale: (locale: string) => set({ locale }),
        }),
        {
            name: import.meta.env.VITE_STORAGE_NAME + "-locale",
        }
    )
);
