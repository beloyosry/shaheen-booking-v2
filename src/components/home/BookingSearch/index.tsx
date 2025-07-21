import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { logFormData } from "../../../utils";
import { useForm } from "react-hook-form";
import InputField from "../../form/InputField";
import Loading from "../../ui/Loading";

type DateRange = {
    startDate: Date | null;
    endDate: Date | null;
};

type FlightForm = {
    tripType: string;
    selectedOption: string;
    from: string;
    to: string;
    date: DateRange;
    travelers: string;
};
type HotelsForm = {
    to: string;
    date: DateRange;
    travelers: string;
};
type TripTypes = "roundtrip" | "oneway" | "multicity";

const dateRangeSchema = z.object({
    startDate: z.date().nullable(),
    endDate: z.date().nullable(),
});

const flightSchema = z.object({
    tripType: z.string(),
    selectedOption: z.string(),
    from: z.string(),
    to: z.string(),
    date: dateRangeSchema,
    travelers: z.string(),
});
const hotelSchema = z.object({
    to: z.string(),
    date: dateRangeSchema,
    travelers: z.string(),
});

const BookingButton = ({
    activeBtn,
    setActiveBtn,
    title,
    icon,
    btnValue,
    btnClassNames,
}: {
    activeBtn: number;
    setActiveBtn: (value: number) => void;
    title: string;
    icon: React.ReactNode;
    btnValue: number;
    btnClassNames?: string;
}) => {
    const isActive = activeBtn === btnValue;

    return (
        <button
            onClick={() => setActiveBtn(btnValue)}
            className={`flex items-center justify-center px-4 py-2 ${btnClassNames} ${
                isActive
                    ? "bg-primary-500 text-white"
                    : "bg-white text-gray-700"
            } `}
        >
            {/* icon */}
            <span className="mr-2">{icon}</span>

            {/* Button text */}
            <span className="font-medium">{title}</span>
        </button>
    );
};

// Trip type options for flights
const TripOption = ({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) => (
    <div
        onClick={onClick}
        className={`flex items-center gap-2 cursor-pointer ${
            isActive ? "text-secondary-500" : "text-gray-400"
        }`}
    >
        <div className="flex flex-col items-center">
            <span className="text-sm">{label}</span>
            {isActive && (
                <div className="w-1.5 h-1.5 bg-secondary-500 rounded-full m-auto"></div>
            )}
        </div>
    </div>
);

function BookingSearch() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [activeBtn, setActiveBtn] = useState(0);
    const [tripType, setTripType] = useState<TripTypes>("roundtrip");
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Economy");

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

    const handleSelectType = (type: TripTypes) => {
        setTripType(type);
    };

    const {
        handleSubmit: flightSubmit,
        control: flightControl,
        reset: flightReset,
    } = useForm<FlightForm>({
        resolver: zodResolver(flightSchema),
        defaultValues: {
            tripType: "",
            selectedOption: "",
            from: "",
            to: "",
            date: {
                startDate: null,
                endDate: null,
            },
            travelers: "",
        },
        mode: "onChange",
    });

    const {
        control: hotelControl,
        handleSubmit: hotelSubmit,
        reset: hotelReset,
    } = useForm<HotelsForm>({
        resolver: zodResolver(hotelSchema),
        defaultValues: {
            to: "",
            date: {
                startDate: null,
                endDate: null,
            },
            travelers: "",
        },
        mode: "onChange",
    });

    const onSubmitFlight = async (formData: FlightForm) => {
        // Check each required field individually for better error messages
        if (!formData.from) {
            return;
        }
        if (!formData.to) {
            return;
        }
        if (!formData.date || !formData.date.startDate) {
            return;
        }
        if (!formData.date.endDate) {
            return;
        }
        if (formData.travelers < "1") {
            return;
        }

        setIsLoading(true);
        const apiFormData = new FormData();

        // Set the tripType from state
        apiFormData.append("tripType", tripType);

        // Set the selectedOption from state
        apiFormData.append("selectedOption", selectedOption);

        apiFormData.append("from", formData.from);
        apiFormData.append("to", formData.to);
        apiFormData.append(
            "startDate",
            formData.date.startDate?.toISOString() || ""
        );
        apiFormData.append(
            "endDate",
            formData.date.endDate?.toISOString() || ""
        );
        apiFormData.append("travelers", formData.travelers);

        logFormData(apiFormData, "Flight Form Data");

        // Reset the form
        flightReset();

        // Navigate to the next page
        navigate("/planes");

        setIsLoading(false);
    };

    const onSubmitHotel = async (formData: HotelsForm) => {
        // Check each required field individually for better error messages
        if (!formData.to) {
            return;
        }
        if (!formData.date || !formData.date.startDate) {
            return;
        }
        if (!formData.date.endDate) {
            return;
        }
        if (formData.travelers < "1") {
            return;
        }

        setIsLoading(true);
        const apiFormData = new FormData();

        apiFormData.append("to", formData.to);
        apiFormData.append(
            "startDate",
            formData.date.startDate?.toISOString() || ""
        );
        apiFormData.append(
            "endDate",
            formData.date.endDate?.toISOString() || ""
        );
        apiFormData.append("travelers", formData.travelers);

        logFormData(apiFormData, "Hotel Form Data");

        // Reset the form
        hotelReset();

        // Navigate to the next page
        navigate("/hotels");

        setIsLoading(false);
        //             title: "Success!",
        //         });
        //         reset();
        //         navigate(-1);
        //         setIsLoading(false);
        //     })
        //     .catch((error) => {
        //         setIsLoading(false);
        //         return setErrors(error);
        //     });
    };

    // Flight search form component
    const FlightSearchForm = () => (
        <form onSubmit={flightSubmit(onSubmitFlight)} className="p-4">
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
                        control={flightControl}
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
                        control={flightControl}
                    />
                </div>

                <InputField
                    placeholder="Dates"
                    type="date"
                    icon={
                        <i className="far fa-calendar-days text-primary-500" />
                    }
                    name="date"
                    control={flightControl}
                />

                <InputField
                    placeholder="Travelers"
                    type="number"
                    icon={<i className="far fa-user text-primary-500" />}
                    name="travelers"
                    control={flightControl}
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

    // Hotel search form component
    const HotelSearchForm = () => (
        <form onSubmit={hotelSubmit(onSubmitHotel)} className="p-4">
            <div className="w-full flex justify-between items-center gap-4">
                <InputField
                    placeholder="Where to?"
                    type="text"
                    icon={
                        <i className="far fa-location-dot text-primary-500" />
                    }
                    name="to"
                    control={hotelControl}
                />

                <InputField
                    placeholder="Dates"
                    type="date"
                    icon={
                        <i className="far fa-calendar-days text-primary-500" />
                    }
                    name="date"
                    control={hotelControl}
                />

                <InputField
                    placeholder="Travelers"
                    type="number"
                    icon={<i className="far fa-user text-primary-500" />}
                    name="travelers"
                    control={hotelControl}
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

    if (isLoading) return <Loading />;

    return (
        <div className="w-full lg:h-fit sm:mb-[118px] relative z-[100] px-3 mt-10 sm:px-0">
            {/* Container for tabs */}
            <div className="flex w-fit bg-white rounded-tl-lg rounded-tr-4xl rounded-bl-lg">
                {/* Stays tab */}
                <BookingButton
                    activeBtn={activeBtn}
                    setActiveBtn={setActiveBtn}
                    btnValue={1}
                    title="Stays"
                    icon={<span className="text-lg">🏨</span>}
                    btnClassNames="rounded-tl-lg rounded-br-2xl"
                />

                {/* Flights tab */}
                <BookingButton
                    activeBtn={activeBtn}
                    setActiveBtn={setActiveBtn}
                    btnValue={0}
                    title="Flights"
                    icon={<span className="text-lg">✈️</span>}
                    btnClassNames="rounded-tr-4xl rounded-bl-2xl"
                />
            </div>

            {/* Container for the selected booking component */}
            <div className="bg-white rounded-b-3xl rounded-tr-3xl shadow-md">
                {/* Render Hotel search if activeBtn is 1 */}
                {activeBtn === 1 ? <HotelSearchForm /> : null}

                {/* Render Flight search if activeBtn is 0 */}
                {activeBtn === 0 ? <FlightSearchForm /> : null}
            </div>
        </div>
    );
}

export default BookingSearch;
