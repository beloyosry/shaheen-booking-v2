import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { FlightForm, TripTypes } from "./types";
import TripOption from "./TripOption";
import { useState } from "react";
import InputField from "../../form/InputField";

type Props = {
    handleFormSubmit: (formData: any) => Promise<void>;
    handleSubmit: (
        onValid: SubmitHandler<any>,
        onInvalid?: SubmitErrorHandler<any> | undefined
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    control: Control<FlightForm, any, FlightForm>;

    setTripType: (type: TripTypes) => void;
    tripType: TripTypes;
    setSelectedOption: (option: string) => void;
    selectedOption: string;
};

export default function FlightSearchForm({
    handleFormSubmit,
    handleSubmit,
    control,
    setTripType,
    setSelectedOption,
    tripType,
    selectedOption,
}: Props) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleSelectType = (type: TripTypes) => {
        setTripType(type);
    };

    const dropDownListOptions = [
        { label: "Economy", value: "economy" },
        { label: "Premium Economy", value: "premium economy" },
        { label: "Business", value: "business" },
        { label: "First Class", value: "first class" },
    ];

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setShowDropdown(false);
    };
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4">
            <div className="flex justify-start gap-4 mb-4">
                <TripOption
                    label="Round-trip"
                    isActive={tripType === "roundtrip"}
                    onClick={() => handleSelectType("roundtrip")}
                />
                <TripOption
                    label="One-Way"
                    isActive={tripType === "oneway"}
                    onClick={() => handleSelectType("oneway")}
                />
                <TripOption
                    label="Multi-City"
                    isActive={tripType === "multicity"}
                    onClick={() => handleSelectType("multicity")}
                />

                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-md"
                        id="dropdown-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                    >
                        <span className="text-xs">{selectedOption}</span>
                        <span className="text-xs">▼</span>
                    </button>
                    {showDropdown && (
                        <ul
                            className="absolute top-10 left-1/2 -translate-x-1/2 z-50 w-full bg-white shadow-lg py-1 rounded-xl"
                            aria-labelledby="dropdown-button"
                            role="menu"
                        >
                            {dropDownListOptions.map((option) => (
                                <li
                                    key={option.value}
                                    onClick={() =>
                                        handleOptionClick(option.label)
                                    }
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                    role="menuitem"
                                >
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="w-full flex justify-between items-center gap-4">
                <div className="relative flex items-center gap-8">
                    <InputField
                        placeholder="Leaving From?"
                        type="text"
                        icon={
                            <i className="far fa-location-dot text-primary-500" />
                        }
                        name="from"
                        control={control}
                    />

                    <div className="absolute left-[45%] flex flex-col justify-center items-center bg-white w-10 h-10 rounded-full">
                        <div className="flex items-center gap-2 text-primary-500">
                            <i className="far fa-arrow-left"></i>
                        </div>
                        <div className="flex items-center gap-2 text-primary-500">
                            <i className="far fa-arrow-right"></i>
                        </div>
                    </div>

                    <InputField
                        placeholder="Going To?"
                        type="text"
                        icon={
                            <i className="far fa-location-dot text-primary-500" />
                        }
                        name="to"
                        control={control}
                    />
                </div>

                <InputField
                    placeholder="Dates"
                    type="date"
                    icon={
                        <i className="far fa-calendar-days text-primary-500" />
                    }
                    name="date"
                    control={control}
                />

                <InputField
                    placeholder="Travelers"
                    type="number"
                    icon={<i className="far fa-user text-primary-500" />}
                    name="travelers"
                    control={control}
                />
                <button
                    type="submit"
                    className="bg-primary-500 text-white px-8 py-3 rounded-2xl font-medium"
                >
                    Search
                </button>
            </div>
        </form>
    );
}
