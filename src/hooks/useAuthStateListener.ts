import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

/**
 * Custom hook to listen for auth state changes in localStorage
 * This allows components outside of React to trigger auth state changes
 */
export const useAuthStateListener = () => {
    const { logout } = useAuthStore();

    useEffect(() => {
        // Function to handle storage changes
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === "shaheen-auth" && e.newValue === "logged_out") {
                // Clear the auth_state flag
                localStorage.removeItem("shaheen-auth");

                // Execute logout
                logout();
            }
        };

        // Listen for storage events (this works across tabs)
        window.addEventListener("storage", handleStorageChange);

        // Also check on mount in case the event was triggered in this tab
        if (localStorage.getItem("shaheen-auth") === "logged_out") {
            localStorage.removeItem("shaheen-auth");
            logout();
        }

        // Cleanup
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [logout]);
};
