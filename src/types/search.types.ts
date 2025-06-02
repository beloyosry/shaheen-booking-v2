export type SearchValues = {
    CheckIn: string;
    CheckOut: string;
    adults: number;
    rooms: number;
    children: number;
    destinationEntityId?: string;
};

export type SearchState = {
    searchParams: SearchValues | null;
    searchResults: any[];
    error: string | null;
    setSearchParams: (params: SearchValues) => void;
    setSearchResults: (results: any[]) => void;
    setError: (error: string | null) => void;
    searchHotels: (values: SearchValues) => Promise<void>;
};
