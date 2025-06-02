import { persist } from "zustand/middleware";
import { create } from "zustand";
import type { AuthState } from "../types";
import { ENDPOINTS } from "../lib/endpoints";
import { getCookie, setSecureCookie, handleLogOut } from "../utils";
import { useLoadingStore } from "./loading.store";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            error: null,

            login: async (credentials) => {
                // Use loading store to handle loading state
                const setIsLoading = useLoadingStore.getState().setIsLoading;
                setIsLoading(true);
                set({ error: null });

                try {
                    const response = await ENDPOINTS.auth.login(credentials);
                    const { token, user } = response.data.data;

                    setSecureCookie("shaheen_token", token, 1);
                    set({
                        user,
                        isAuthenticated: true,
                        error: null,
                    });
                    setIsLoading(false);
                } catch (err: any) {
                    set({
                        error: err?.response?.data?.message || "Login failed",
                    });
                    setIsLoading(false);
                    throw err; // Let caller handle if needed
                }
            },

            register: async (credentials) => {
                const setIsLoading = useLoadingStore.getState().setIsLoading;
                setIsLoading(true);
                set({ error: null });
                try {
                    const response = await ENDPOINTS.auth.register(credentials);
                    const { user, token } = response.data.data;
                    setSecureCookie("shaheen_token", token, 1);
                    set({
                        user,
                        isAuthenticated: true,
                        error: null,
                    });
                    setIsLoading(false);
                } catch (err: any) {
                    setIsLoading(false);
                    set({
                        error:
                            err?.response?.data?.message ||
                            "Registration failed",
                    });
                    throw err;
                }
            },

            logout: async () => {
                const setIsLoading = useLoadingStore.getState().setIsLoading;
                setIsLoading(true);
                try {
                    await ENDPOINTS.auth.logout();
                } catch (err) {
                    console.error("Logout failed", err);
                }
                handleLogOut();
                set({
                    user: null,
                    isAuthenticated: false,
                    error: null,
                });
                setIsLoading(false);
            },

            fetchProfile: async () => {
                const setIsLoading = useLoadingStore.getState().setIsLoading;
                setIsLoading(true);
                const token = getCookie("shaheen_token");
                if (!token) {
                    // If no token is found, log the user out
                    set({
                        error: "No token found",
                        user: null,
                        isAuthenticated: false, // Set to false to trigger logout
                    });
                    setIsLoading(false);

                    return null;
                }
                setSecureCookie("shaheen_token", token, 1); // ensure token in localStorage for interceptor
                try {
                    const response = await ENDPOINTS.auth.profile();
                    const userData = response.data.data;
                    set({
                        user: userData,
                        isAuthenticated: true,
                        error: null,
                    });
                    setIsLoading(false);
                    return userData;
                } catch (err: any) {
                    // Check if it's an authentication error (401 or 403)
                    const isAuthError =
                        err?.response?.status === 401 ||
                        err?.response?.status === 403;

                    set({
                        error:
                            err?.response?.data?.message ||
                            "Failed to fetch profile",
                        // Set isAuthenticated to false only for auth errors
                        isAuthenticated: isAuthError ? false : undefined,
                        // Clear user data for auth errors
                        user: isAuthError ? null : undefined,
                    });
                    setIsLoading(false);

                    // Show message for auth errors
                    if (isAuthError) {
                        setSecureCookie("shaheen_token", "", -1);
                    }

                    return null;
                }
            },
        }),
        {
            name: import.meta.env.VITE_STORAGE_NAME + "-auth",
        }
    )
);
