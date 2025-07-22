export type Hotel = {
    HotelCode: string;
    HotelName: string;
    Latitude: string;
    Longitude: string;
    HotelRating: string;
    Address: string;
    CountryName: string;
    CountryCode: string;
    CityName: string;
};

export type HotelsState = {
    hotels: Hotel[];
    isLoading: boolean;
    error: string | null;
    selectedCityCode: string | null;
    getHotelCodesByCity: (cityCode: string) => Promise<any>;
    setHotels: (hotels: Hotel[]) => void;
    setError: (error: string | null) => void;
    setSelectedCityCode: (cityCode: string | null) => void;
};
