import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ENDPOINTS } from "../lib/endpoints";
import type { HotelsState } from "../types";

export const useHotelsStore = create<HotelsState>()(
    persist(
        (set, get) => ({
            hotels: [],
            isLoading: false,
            error: null,
            selectedCityCode: null,

            setHotels: (hotels) => set({ hotels }),
            setError: (error) => set({ error }),
            setSelectedCityCode: (cityCode) =>
                set({ selectedCityCode: cityCode }),

            getHotelCodesByCity: async (cityCode) => {
                const { setHotels, setError, setSelectedCityCode } =
                    get();
                const previousHotels = get().hotels;

                try {
                    // Set loading state
                    set({ isLoading: true });
                    setError(null);

                    // Make API call
                    const response =
                        await ENDPOINTS.hotel.public.hotelsByCityCode({
                            city_code: cityCode,
                            details: "false",
                        });

                    // Process the hotel data
                    const hotelsData = response.data?.data?.Hotels || [];
                    const processedHotels = hotelsData.map((item: any) => ({
                        HotelCode: item.HotelCode,
                        HotelName: item.HotelName,
                        Latitude: item.Latitude,
                        Longitude: item.Longitude,
                        HotelRating: item.HotelRating,
                        Address: item.Address,
                        CountryName: item.CountryName,
                        CountryCode: item.CountryCode,
                        CityName: item.CityName,
                    }));

                    // Update state with new data if available
                    if (processedHotels.length > 0) {
                        setHotels(processedHotels);
                        setSelectedCityCode(cityCode);
                    }

                    // Clear loading state
                    set({ isLoading: false });

                    return response.data;
                } catch (error: any) {
                    console.error("Error fetching hotel codes:", error);

                    // Restore previous state in case of error
                    setHotels(previousHotels);

                    // Set error state
                    setError(error.message || "Failed to fetch hotel codes");

                    // Clear loading state
                    set({ isLoading: false });

                    return {
                        success: false,
                        message: "Failed to fetch hotel codes",
                        error,
                    };
                }
            },
        }),
        {
            name: import.meta.env.VITE_STORAGE_NAME + "-hotels",
            partialize: (state) => ({
                hotels: state.hotels,
                selectedCityCode: state.selectedCityCode,
            }),
        }
    )
);
