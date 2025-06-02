import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth.store";
import { useRegionStore } from "../store/regions.store";

export const useInitializeApp = () => {
    const { isAuthenticated, fetchProfile } = useAuthStore();
    const { initializeRegions } = useRegionStore();
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

                // Initialize regions data (user location, countries, etc.)
                await initializeRegions();
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
