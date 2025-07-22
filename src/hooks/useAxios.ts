import { useEffect, useState } from "react";
import { usePopupStore } from "../store/pop-up.store";
import api from "../lib/api";

/**
 * Hook to configure axios interceptors with loading and popup state management
 * Uses the centralized api instance from api.ts
 */
/**
 * Hook to configure axios interceptors with loading and popup state management
 * Uses the centralized api instance from api.ts
 */
const useAxios = () => {
    const [isLoadingApi, setIsLoadingApi] = useState(false);
    const { setPopupVisible } = usePopupStore();

    useEffect(() => {
        // Request interceptor for loading state
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                setIsLoadingApi(true);
                return config;
            },
            (error) => {
                setIsLoadingApi(false);
                return Promise.reject(error);
            }
        );

        // Response interceptor for loading state and error handling
        const responseInterceptor = api.interceptors.response.use(
            (response) => {
                setIsLoadingApi(false);
                return response;
            },
            (error) => {
                // Handle response errors here
                const message =
                    error?.data?.message ||
                    error?.response?.data?.error ||
                    error?.response?.data?.message ||
                    `برجاء المحاولة في وقت اخر`;

                // Only show popup for non-auth errors (auth errors are handled in api.ts)
                if (error.response && error.response.status !== 401) {
                    setPopupVisible({
                        visible: true,
                        success: false,
                        message,
                        title: "خطاء",
                    });
                }

                setIsLoadingApi(false);
                return Promise.reject(error);
            }
        );

        // Cleanup function to eject interceptors when component unmounts
        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [setIsLoadingApi, setPopupVisible]);

    return { api, isLoadingApi };
};

export default useAxios;
