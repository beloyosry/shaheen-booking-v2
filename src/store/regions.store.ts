import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ENDPOINTS } from "../lib/endpoints";
import { useLoadingStore } from "./loading.store";
import type { City, Country, Region, RegionState } from "../types";
import { useHotelsStore } from "./hotels.store";

// Global request tracking to prevent duplicate API calls
let regionsRequestInProgress: Promise<any> | null = null;
const citiesRequestInProgress: { [key: string]: Promise<any> } = {};
let userCountryRequestInProgress: Promise<any> | null = null;

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
            isInitializing: false, // Flag to track initialization in progress

            getUserCountry: async () => {
                // If we already have user country data, return it
                if (get().userCountry) {
                    console.log("Using cached user country data");
                    return get().userCountry;
                }

                // If already loading, return the existing promise
                if (userCountryRequestInProgress) {
                    console.log(
                        "User country request already in progress, waiting for it to complete"
                    );
                    try {
                        const setIsLoading =
                            useLoadingStore.getState().setIsLoading;
                        setIsLoading(true);
                        await userCountryRequestInProgress;
                        return get().userCountry;
                    } catch (error) {
                        console.error(
                            "Error in existing user country request:",
                            error
                        );
                        return null;
                    } finally {
                        const setIsLoading =
                            useLoadingStore.getState().setIsLoading;
                        setIsLoading(false);
                    }
                }

                // If already loading in state, don't make duplicate requests
                if (get().isLoadingUserCountry) {
                    console.log(
                        "User country loading state is true, skipping request"
                    );
                    return null;
                }

                try {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    set({ isLoadingUserCountry: true });

                    // Create a promise for this request
                    userCountryRequestInProgress =
                        ENDPOINTS.regions.getUserCountry();

                    // Use the tracked promise
                    const response = await userCountryRequestInProgress;
                    const userData = response.data || {};
                    const countryCode = userData.country_code || "";

                    set({
                        userCountry: userData,
                        countryCode,
                        isLoadingUserCountry: false,
                    });

                    return userData;
                } catch (error) {
                    // Clear the promise on error
                    userCountryRequestInProgress = null;
                    set({
                        error: "Failed to fetch user country",
                        isLoadingUserCountry: false,
                    });
                    return null;
                } finally {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    // Clear the promise when done
                    userCountryRequestInProgress = null;
                }
            },

            getCountryFlag: (countryCode: string) => {
                return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
            },

            setSelectedCountry: async (country) => {
                try {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    // First update the selected country immediately to improve UI responsiveness
                    set({
                        selectedCountry: country,
                        countryCode: country.code,
                    });

                    // Then get the cities for this country
                    await get().getCities(country.code);

                    // Get cities from the store after they've been updated
                    const cities = get().cities;

                    // If a city is selected in the country object, fetch hotel codes for that city
                    if (country.city && cities && cities.length > 0) {
                        // Find the city code that matches the city name
                        const cityObj = cities.find(
                            (city: City) => city.name === country.city
                        );
                        if (cityObj && cityObj.code) {
                            console.log(
                                "Fetching hotel codes for city:",
                                cityObj.code
                            );
                            // Call the hotels store to fetch hotel codes for this city
                            await useHotelsStore
                                .getState()
                                .getHotelCodesByCity(cityObj.code);
                        }
                    }
                } catch (error) {
                    console.error("Error setting selected country:", error);
                    set({
                        error: "Failed to fetch cities for selected country",
                    });
                } finally {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                }
            },

            initializeRegions: async () => {
                // Prevent multiple initializations
                if (get().isInitialized) {
                    console.log(
                        "Regions already initialized, skipping initialization"
                    );
                    return;
                }

                // Prevent concurrent initializations
                if (get().isInitializing) {
                    console.log(
                        "Regions initialization already in progress, skipping"
                    );
                    return;
                }

                try {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    // Set initialization state to prevent duplicate calls
                    set({ isInitialized: false, isInitializing: true });
                    console.log("Starting regions initialization");

                    // Step 1: Get user's country information and regions in parallel
                    // Use the getRegions method which has caching instead of direct API call
                    const userCountryData = await get().getUserCountry();
                    await get().getRegions();

                    // Use the regions data from the store instead of parsing the response again
                    const regions = get().regions;

                    // Regions are already updated in the store by getRegions()

                    let selectedRegion = null;
                    let citiesPromise = null;

                    // Step 2: Try to find the user's country in the regions list
                    if (userCountryData && userCountryData.country_code) {
                        const userCountryCode = userCountryData.country_code;

                        // Try to find exact match by country code
                        const userRegion = regions.find(
                            (region: Region) => region.code === userCountryCode
                        );

                        if (userRegion) {
                            // Add flag and city information
                            selectedRegion = {
                                ...userRegion,
                                flag: get().getCountryFlag(userRegion.code),
                                city: userCountryData.city || "",
                                currency: userCountryData.country_code || "",
                            };

                            // Start cities request but don't await yet
                            citiesPromise =
                                ENDPOINTS.regions.getCities(userCountryCode);
                        }
                    }

                    // If we still don't have a selected country but we have geolocation data, create a country from it
                    if (!selectedRegion && userCountryData) {
                        // Create a country directly from geolocation data
                        selectedRegion = {
                            code: userCountryData.country_code,
                            name: userCountryData.country, // The API returns the country name
                            flag: get().getCountryFlag(
                                userCountryData.country_code
                            ),
                            city: userCountryData.city || "",
                            currency: userCountryData.country_code,
                        };

                        // Start cities request but don't await yet
                        citiesPromise = ENDPOINTS.regions.getCities(
                            userCountryData.country_code
                        );
                    }

                    // If we have a selected region and a cities request in progress
                    if (selectedRegion && citiesPromise) {
                        // Update the selected country immediately for UI responsiveness
                        set({ selectedCountry: selectedRegion });

                        // Now await the cities response
                        const citiesResponse = await citiesPromise;
                        const cities = citiesResponse?.data?.data || [];

                        // Find the city that matches the user's city from geolocation
                        if (selectedRegion.city) {
                            const cityObj = cities.find(
                                (city: City) =>
                                    city.name === selectedRegion.city
                            );

                            if (cityObj && cityObj.code) {
                                console.log(
                                    "Initializing: Fetching hotel codes for city:",
                                    cityObj.code
                                );
                                // Call the hotels store to fetch hotel codes for this city
                                await useHotelsStore
                                    .getState()
                                    .getHotelCodesByCity(cityObj.code);
                            }
                        }
                        set({ cities });
                    }

                    // Mark initialization as complete
                    set({ isInitialized: true, isInitializing: false });
                    console.log(
                        "Regions initialization completed successfully"
                    );
                } catch (error) {
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
                        isInitializing: false, // Reset initializing flag
                        selectedCountry: defaultCountry,
                    });
                    console.error("Error initializing regions:", error);
                } finally {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                }
            },

            getRegions: async () => {
                // Check if regions are already loaded
                if (get().regions.length > 0) {
                    console.log(
                        "Using existing regions list, count:",
                        get().regions.length
                    );
                    return get().regions;
                }

                // If there's already a request in progress, wait for it
                if (regionsRequestInProgress) {
                    console.log(
                        "Regions request already in progress, waiting for it to complete"
                    );
                    try {
                        const setIsLoading =
                            useLoadingStore.getState().setIsLoading;
                        setIsLoading(true);
                        await regionsRequestInProgress;
                        return get().regions;
                    } catch (error) {
                        console.error(
                            "Error in existing regions request:",
                            error
                        );
                        return [];
                    } finally {
                        const setIsLoading =
                            useLoadingStore.getState().setIsLoading;
                        setIsLoading(false);
                    }
                }

                try {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    // Create a promise for this request
                    regionsRequestInProgress = ENDPOINTS.regions.getRegions();
                    const response = await regionsRequestInProgress;
                    const format = response?.data?.data?.items?.map(
                        (item: Region) => {
                            // Add flag and currency to the country object
                            const enhancedCountry = {
                                ...item?.country,
                                flag: get().getCountryFlag(item?.country?.code),
                                currency: item?.country?.code || "",
                            };

                            const newFormat = {
                                id: item?.id,
                                code: item?.code,
                                name: item?.name,
                                country: enhancedCountry,
                            };
                            return newFormat;
                        }
                    );
                    set({ regions: format });
                    return format;
                } catch (error) {
                    set({ error: "Failed to fetch regions" });
                    return [];
                } finally {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    // Clear the promise when done
                    regionsRequestInProgress = null;
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
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    console.log("Fetching countries list from API");
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
                } catch (error) {
                    console.error("Error fetching countries:", error);
                    set({
                        error: "Failed to fetch countries",
                        isLoadingCountries: false,
                    });
                } finally {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                }
            },

            getCities: async (country_code: string) => {
                // If we already have cities for this country code, don't fetch again
                if (
                    get().cities.length > 0 &&
                    get().countryCode === country_code
                ) {
                    console.log("Using existing cities list for", country_code);
                    return get().cities;
                }

                // If there's already a request in progress for this country, wait for it
                const existingRequest = citiesRequestInProgress[country_code];
                if (existingRequest) {
                    console.log(
                        "Cities request for",
                        country_code,
                        "already in progress, waiting for it to complete"
                    );
                    try {
                        const setIsLoading =
                            useLoadingStore.getState().setIsLoading;
                        setIsLoading(true);
                        await existingRequest;
                        return get().cities;
                    } catch (error) {
                        console.error(
                            "Error in existing cities request:",
                            error
                        );
                        return [];
                    } finally {
                        const setIsLoading =
                            useLoadingStore.getState().setIsLoading;
                        setIsLoading(false);
                    }
                }

                try {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    // Create a promise for this request
                    citiesRequestInProgress[country_code] =
                        ENDPOINTS.regions.getCities(country_code);
                    const response = await citiesRequestInProgress[
                        country_code
                    ];
                    const format = response?.data?.data;
                    set({ cities: format, countryCode: country_code });
                    return format;
                } catch (error) {
                    set({ error: "Failed to fetch cities" });
                    return [];
                } finally {
                    const setIsLoading =
                        useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    // Clear the promise when done
                    delete citiesRequestInProgress[country_code];
                }
            },
        }),
        {
            name: import.meta.env.VITE_STORAGE_NAME + "-regions",
        }
    )
);
