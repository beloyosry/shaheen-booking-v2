import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/auth.store";
import { useRegionStore } from "../store/regions.store";

export const useInitializeApp = () => {
    const { isAuthenticated, fetchProfile, isLoading } = useAuthStore();
    const { initializeRegions } = useRegionStore();
    const initializationDone = useRef(false);

    useEffect(() => {
        // Skip if already initialized
        if (initializationDone.current) return;

        // Load user profile, countries info, and set default currency if needed
        const loadInitialData = async () => {
            try {
                console.log("Initializing app...");

                // Always initialize regions first to ensure we have country data
                // This will set the user's country based on geolocation
                // Then load user profile if logged in
                if (isAuthenticated) {
                    console.log("User is authenticated, fetching profile...");
                    await fetchProfile();
                }

                console.log("Initializing regions and country data...");
                await initializeRegions();

                console.log("App initialization complete.");
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

    return { isLoading };
};
