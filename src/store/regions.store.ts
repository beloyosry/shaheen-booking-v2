import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ENDPOINTS } from "../lib/endpoints";
import { useLoadingStore } from "./loading.store";

type UserCountry = {
    area_code: string;
    organization_name: string;
    country_code: string;
    country_code3: string;
    continent_code: string;
    region: string;
    latitude: string;
    longitude: string;
    accuracy: number;
    asn: number;
    timezone: string;
    city: string;
    organization: string;
    country: string;
    ip: string;
};

type Country = {
    id?: string;
    code: string;
    name: string;
    flag?: string;
    city?: string;
    currency?: string;
};

type Region = {
    id: string;
    code: string;
    name: string;
    country: Country;
};

type City = {
    id: string;
    code: string;
    name: string;
};

type RegionState = {
    regions: Region[];
    countries: Country[];
    countryCode: string;
    cities: City[];
    userCountry: UserCountry | null;
    selectedCountry: Country | null;
    error: string | null;
    isInitialized: boolean;
    isLoadingCountries: boolean;
    isLoadingUserCountry: boolean;

    getUserCountry: () => Promise<UserCountry | null>;
    getRegions: () => Promise<void>;
    getCountries: () => Promise<void>;
    getCities: (country_code: string) => Promise<void>;
    initializeRegions: () => Promise<void>;
    setSelectedCountry: (country: Country) => void;
    getCountryFlag: (countryCode: string) => string;
};

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
                    const setIsLoading = useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    set({ isLoadingUserCountry: true });
                    
                    const response = await ENDPOINTS.regions.getUserCountry();
                    const userData = response.data || {};
                    const countryCode = userData.country_code || "";
                    
                    set({
                        userCountry: userData,
                        countryCode,
                        isLoadingUserCountry: false
                    });
                    
                    setIsLoading(false);
                    return userData;
                } catch (error) {
                    const setIsLoading = useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    set({ 
                        error: "Failed to fetch user country",
                        isLoadingUserCountry: false 
                    });
                    return null;
                }
            },

            getCountryFlag: (countryCode: string) => {
                return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
            },

            setSelectedCountry: (country: Country) => {
                set({ selectedCountry: country });
            },

            initializeRegions: async () => {
                // Prevent multiple initializations
                if (get().isInitialized) {
                    return;
                }
                
                try {
                    const setIsLoading = useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    
                    // Step 1: Get user's country information
                    const userCountryData = await get().getUserCountry();
                    if (!userCountryData) {
                        console.warn("Could not fetch user country data, continuing initialization");
                    }
                    
                    // Step 2: Get all countries (only if we don't already have them)
                    if (get().countries.length === 0) {
                        await get().getCountries();
                    }
                    
                    // Step 3: Find the user's country in the countries list and set it as selected
                    if (userCountryData && userCountryData.country_code) {
                        const userCountryCode = userCountryData.country_code;
                        const countries = get().countries;
                        
                        const userCountry = countries.find(
                            (country) => country.code === userCountryCode
                        );
                        
                        if (userCountry) {
                            // Add flag and city information
                            const enhancedUserCountry = {
                                ...userCountry,
                                flag: get().getCountryFlag(userCountry.code),
                                city: userCountryData.city || "",
                                currency: userCountryData.country_code || ""
                            };
                            
                            set({ selectedCountry: enhancedUserCountry });
                        }
                    }
                    
                    // Mark as initialized to prevent duplicate calls
                    set({ isInitialized: true });
                    setIsLoading(false);
                } catch (error) {
                    const setIsLoading = useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    set({ 
                        error: "Failed to initialize regions",
                        isInitialized: true // Mark as initialized even on error to prevent loops
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
                // If we already have countries and not forcing a refresh, return early
                if (get().countries.length > 0) {
                    return;
                }
                
                // If already loading, don't make duplicate requests
                if (get().isLoadingCountries) {
                    return;
                }
                
                try {
                    const setIsLoading = useLoadingStore.getState().setIsLoading;
                    setIsLoading(true);
                    set({ isLoadingCountries: true });
                    
                    const response = await ENDPOINTS.regions.getCountries();
                    
                    // Filter out Israel and enhance countries with flags
                    const filteredData = response?.data?.data?.filter(
                        (country: Country) =>
                            country && country.name && country.name !== "Israel"
                    ) || [];
                    
                    // Add flag URLs to each country
                    const enhancedCountries = filteredData.map((country: Country) => ({
                        ...country,
                        flag: get().getCountryFlag(country.code)
                    }));
                    
                    set({ 
                        countries: enhancedCountries,
                        isLoadingCountries: false 
                    });
                    
                    setIsLoading(false);
                } catch (error) {
                    const setIsLoading = useLoadingStore.getState().setIsLoading;
                    setIsLoading(false);
                    set({ 
                        error: "Failed to fetch countries",
                        isLoadingCountries: false 
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
