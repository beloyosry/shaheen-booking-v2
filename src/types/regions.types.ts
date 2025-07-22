export type UserCountry = {
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

export type Country = {
    id?: string;
    code: string;
    name: string;
    flag?: string;
    city?: string;
    currency?: string;
};

export type Region = City & {
    country: Country;
};

export type City = {
    id: string;
    code: string;
    name: string;
};

export type RegionState = {
    regions: Region[];
    countries: Country[];
    countryCode: string;
    cities: City[];
    userCountry: UserCountry | null;
    selectedCountry: Country | null;
    isLoading: boolean;
    error: string | null;
    isInitialized: boolean;
    isInitializing: boolean; // Flag to track initialization in progress
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
