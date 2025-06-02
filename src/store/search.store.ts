import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { useLoadingStore } from "./loading.store";
import type { SearchState } from "../types";

export const useSearchStore = create<SearchState>()(
    persist(
        (set, get) => ({
            searchParams: null,
            searchResults: [],
            error: null,

            setSearchParams: (params) => set({ searchParams: params }),
            setSearchResults: (results) => set({ searchResults: results }),
            setError: (error) => set({ error }),

            searchHotels: async (values) => {
                const { setSearchParams, setSearchResults, setError } = get();
                const { setIsLoading } = useLoadingStore.getState();

                try {
                    setIsLoading(true);
                    setError(null);
                    setSearchParams(values);

                    // Make API call to search hotels
                    // This is a placeholder - replace with your actual API endpoint
                    const response = await axios.post("/hotels/search", values);

                    if (response.data && response.data.success) {
                        setSearchResults(response.data.data || []);
                    } else {
                        setError("Failed to search hotels");
                    }

                    return Promise.resolve();
                } catch (error) {
                    console.error("Error searching hotels:", error);
                    setError("An error occurred while searching for hotels");
                    return Promise.reject(error);
                } finally {
                    setIsLoading(false);
                }
            },
        }),
        {
            name: import.meta.env.VITE_STORAGE_NAME + "-search",
            partialize: (state) => ({
                searchParams: state.searchParams,
            }),
        }
    )
);
