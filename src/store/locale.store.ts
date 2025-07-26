import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LocaleState = {
    locale: string;
    setLocale: (locale: string) => void;
    isArabic: boolean;
};

export const localeStore = create<LocaleState>()(
    persist(
        (set) => ({
            locale: "ar",
            isArabic: true,
            setLocale: (locale: string) => {
                const isArabic = locale.split("-")[0].toUpperCase() === "AR";
                set({
                    locale,
                    isArabic,
                });
            },
        }),
        {
            name: import.meta.env.VITE_STORAGE_NAME + "-locale",
        }
    )
);
