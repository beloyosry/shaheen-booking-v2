import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ENDPOINTS } from "../lib/endpoints";

interface Country {
    code: string;
    name: string;
    city?: string;
    flag?: string;
}

interface CurrencyState {
    currency: Country | null;
    setCurrency: (currency: Country) => void;
    initializeUserCurrency: () => Promise<void>;
    getUserCurrency: () => Country | null;
    hasStoredCurrency: () => boolean;
    countriesData: Country[] | null;
    countryCode: string | null;
    setCountriesData: () => Promise<{ countriesData: Country[]; countryCode: string }>;
}

export const useCurrencyStore = create<CurrencyState>()(
    persist(
        (set, get) => ({
            currency: null,
            setCurrency: (currency) => set({ currency }),
            countriesData: null,
            countryCode: null,
            setCountriesData: async () => {
                try {
                    const response = await ENDPOINTS.country.countriesInfo();
                    const countriesData = response.data || [];
                    const countryCode = response.data.country_code || "";
                    set({ countriesData, countryCode });
                    return { countriesData, countryCode };
                } catch (error) {
                    console.error("Error fetching countries data:", error);
                    return { countriesData: [], countryCode: "" };
                }
            },
            getUserCurrency: () => get().currency,

            hasStoredCurrency: () => {
                return get().currency !== null;
            },

            initializeUserCurrency: async () => {
                try {
                    // Make sure we have countries data first
                    let countriesData = get().countriesData;
                    let userCountryCode = get().countryCode;
                    
                    // If we don't have countries data yet, fetch it
                    if (!countriesData || countriesData.length === 0) {
                        const result = await get().setCountriesData();
                        countriesData = result.countriesData;
                        userCountryCode = result.countryCode;
                    }
                    
                    // Get user's location directly from the endpoint
                    const response = await ENDPOINTS.country.countriesInfo();
                    const userCity = response.data.city || "";

                    // Find matching country in countries data
                    if (countriesData && countriesData.length > 0) {
                        const userCountry = countriesData.find(
                            (country) => country.code === userCountryCode
                        );

                        if (userCountry) {
                            // Add city to country object
                            const countryWithCity = {
                                ...userCountry,
                                city: userCity,
                            };

                            // Set as current currency
                            set({ currency: countryWithCity });

                            console.log(
                                "Default currency set based on user location:",
                                countryWithCity
                            );
                        } else {
                            // Create a default country object directly from the IP data
                            const defaultCountry = {
                                code: userCountryCode!,
                                name: userCountryCode!, // Use code as name temporarily
                                city: userCity || "",
                                flag: `https://flagcdn.com/w80/${userCountryCode!.toLowerCase()}.png`,
                            };

                            set({ currency: defaultCountry });
                            console.log(
                                "Default currency set from IP address data:",
                                defaultCountry
                            );
                        }
                    }
                } catch (error) {
                    console.error("Error initializing user currency:", error);
                }
            },
        }),
        {
            name: import.meta.env.VITE_STORAGE_NAME + "-currency",
        }
    )
);
