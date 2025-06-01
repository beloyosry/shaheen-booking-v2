import { useEffect } from "react";

const useHideDialog = (setVisible: (visible: boolean) => void) => {
    const handleHide = () => setVisible(false);

    useEffect(() => {
        const listenToKeyboardEvents = (e: KeyboardEvent) => {
            if (e.code === "Escape") handleHide();
        };

        window.addEventListener("keydown", listenToKeyboardEvents);

        return () =>
            window.removeEventListener("keydown", listenToKeyboardEvents);
    }, []);

    useEffect(() => {
        window.addEventListener("click", handleHide);

        return () => window.removeEventListener("click", handleHide);
    }, []);
    return () => {};
};

export default useHideDialog;
