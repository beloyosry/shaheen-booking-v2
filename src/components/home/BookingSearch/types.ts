export type DateRange = {
    startDate: Date | null;
    endDate: Date | null;
};

export type FlightForm = {
    tripType: string;
    selectedOption: string;
    from: string;
    to: string;
    date: DateRange;
    travelers: string;
};
export type HotelsForm = {
    to: string;
    date: DateRange;
    travelers: string;
};
export type TripTypes = "roundtrip" | "oneway" | "multicity";
