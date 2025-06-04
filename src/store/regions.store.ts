import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ENDPOINTS } from "../lib/endpoints";
import { useLoadingStore } from "./loading.store";
import type { Country, Region, RegionState } from "../types";

export const useRegionStore = create<RegionState>()(
    persist(
        (set, get) => ({
            regions: [],
            countries: [],
            countryCode: "",
            cities: [],
            userCountry: null,
            selectedCountry: null,
            error: null,
            isInitialized: false,
            isLoadingCountries: false,
            isLoadingUserCountry: false,

            getUserCountry: async () => {
                // If we already have user country data, return it
                if (get().userCountry) {
                    return get().userCountry;
                }

                // If already loading, don't make duplicate requests
                if (get().isLoadingUserCountry) {
                    return null;
                }

                try {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    set({ isLoadingUserCountry: true });

                    const response = await ENDPOINTS.regions.getUserCountry();
                    const userData = response.data || {};
                    const countryCode = userData.country_code || "";

                    set({
                        userCountry: userData,
                        countryCode,
                        isLoadingUserCountry: false,
                    });

                    setIsLoading(false);
                    return userData;
                } catch (error) {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    set({
                        error: "Failed to fetch user country",
                        isLoadingUserCountry: false,
                    });
                    return null;
                }
            },

            getCountryFlag: (countryCode: string) => {
                return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
            },

            setSelectedCountry: async (country: Country) => {
                try {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);

                    // First update the selected country immediately to improve UI responsiveness
                    set({
                        selectedCountry: country,
                        countryCode: country.code,
                    });

                    // Then fetch the cities for the selected country
                    const response = await ENDPOINTS.regions.getCities(
                        country.code
                    );
                    const cities = response?.data?.data || [];

                    // Update the cities in the store
                    set({ cities });

                    setIsLoading(false);
                } catch (error) {
                    console.error("Error setting selected country:", error);
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    set({
                        error: "Failed to fetch cities for selected country",
                    });
                }
            },

            initializeRegions: async () => {
                // Prevent multiple initializations
                if (get().isInitialized) {
                    return;
                }

                try {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);

                    // Step 1: First get user's country information from geolocation
                    const userCountryData = await get().getUserCountry();

                    // Step 2: Then get all countries list
                    await get().getCountries();

                    const countries = get().countries;
                    let selectedCountry = null;

                    // Step 3: Try to find the user's country in the countries list
                    if (userCountryData && userCountryData.country_code) {
                        const userCountryCode = userCountryData.country_code;

                        // Try to find exact match by country code
                        const userCountry = countries.find(
                            (country) => country.code === userCountryCode
                        );

                        if (userCountry) {
                            // Add flag and city information
                            selectedCountry = {
                                ...userCountry,
                                flag: get().getCountryFlag(userCountry.code),
                                city: userCountryData.city || "",
                                currency: userCountryData.country_code || "",
                            };
                            console.log(
                                "Found matching country in list:",
                                selectedCountry.name
                            );

                            await get().getCities(userCountryCode);

                            set({ selectedCountry });

                            set({ isInitialized: true });
                            return;
                        }
                    }

                    // If we still don't have a selected country but we have geolocation data, create a country from it
                    if (!selectedCountry && userCountryData) {
                        // Create a country directly from geolocation data
                        selectedCountry = {
                            code: userCountryData.country_code,
                            name: userCountryData.country, // The API returns the country name
                            flag: get().getCountryFlag(
                                userCountryData.country_code
                            ),
                            city: userCountryData.city || "",
                            currency: userCountryData.country_code,
                        };

                        await get().getCities(userCountryData.country_code);

                        set({ selectedCountry });

                        set({ isInitialized: true });
                        return;
                    }

                    setIsLoading(false);
                } catch (error) {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);

                    // Even on error, set a default country
                    const defaultCountry = {
                        code: "EG",
                        name: "Egypt",
                        flag: get().getCountryFlag("EG"),
                        city: "Cairo",
                        currency: "EG",
                    };

                    set({
                        error: "Failed to initialize regions",
                        isInitialized: true, // Mark as initialized even on error to prevent loops
                        selectedCountry: defaultCountry,
                    });
                    console.error("Error initializing regions:", error);
                }
            },

            getRegions: async () => {
                try {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    const response = await ENDPOINTS.regions.getRegions();
                    const format = response?.data?.data?.items?.map(
                        (item: Region) => {
                            const newFormat = {
                                entityId: item?.id,
                                code: item?.code,
                                name: item?.name,
                                country: item?.country,
                            };
                            return newFormat;
                        }
                    );
                    set({ regions: format });
                    setIsLoading(false);
                } catch (error) {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    set({ error: "Failed to fetch regions" });
                }
            },

            getCountries: async () => {
                // If already loading, don't make duplicate requests
                if (get().isLoadingCountries) {
                    return;
                }

                // If we already have countries, don't fetch again
                if (get().countries.length > 0) {
                    console.log(
                        "Using existing countries list, count:",
                        get().countries.length
                    );
                    return;
                }

                try {
                    console.log("Fetching countries list from API");
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    set({ isLoadingCountries: true });

                    const response = await ENDPOINTS.regions.getCountries();

                    // Filter out Israel and enhance countries with flags
                    const filteredData =
                        response?.data?.data?.filter(
                            (country: Country) =>
                                country &&
                                country.name &&
                                country.name !== "Israel"
                        ) || [];

                    // Add flag URLs to each country
                    const enhancedCountries = filteredData.map(
                        (country: Country) => ({
                            ...country,
                            flag: get().getCountryFlag(country.code),
                        })
                    );

                    console.log(
                        "Fetched countries count:",
                        enhancedCountries.length
                    );

                    set({
                        countries: enhancedCountries,
                        isLoadingCountries: false,
                    });

                    setIsLoading(false);
                } catch (error) {
                    console.error("Error fetching countries:", error);
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    set({
                        error: "Failed to fetch countries",
                        isLoadingCountries: false,
                    });
                }
            },

            getCities: async (country_code: string) => {
                try {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    const response = await ENDPOINTS.regions.getCities(
                        country_code
                    );
                    const format = response?.data?.data;
                    set({ cities: format });
                    setIsLoading(false);
                } catch (error) {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    set({ error: "Failed to fetch cities" });
                }
            },
        }),
        {
            name: import.meta.env.VITE_STORAGE_NAME + "-regions",
        }
    )
);
