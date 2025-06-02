import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth.store";
import { useCurrencyStore } from "../store/currency.store";

export const useInitializeApp = () => {
    const { isAuthenticated, fetchProfile } = useAuthStore();
    const { initializeUserCurrency, hasStoredCurrency } = useCurrencyStore();
    const initializationDone = useRef(false);

    useEffect(() => {
        // Skip if already initialized
        if (initializationDone.current) return;
        // Load user profile, countries info, and set default currency if needed
        const loadInitialData = async () => {
            try {
                // Load user profile if logged in
                if (isAuthenticated) {
                    await fetchProfile();
                }

                // Check if currency exists in store and initialize if needed
                if (!hasStoredCurrency()) {
                    console.log(
                        "No currency found in store, setting default..."
                    );

                    // Initialize currency based on user location and countries data
                    await initializeUserCurrency();
                }
            } catch (error) {
                console.error("Error loading initial data:", error);
            }
        };

        loadInitialData()
            .then(() => {
                // Mark initialization as complete
                initializationDone.current = true;
            })
            .catch((error) => {
                console.error("Initialization failed:", error);
                // Still mark as done to prevent infinite retries
                initializationDone.current = true;
            });

        // No cleanup needed
        return () => {};
    }, []);
};
