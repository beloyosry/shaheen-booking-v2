import { useRef, useState } from "react";
import Calendar from "../../ui/Calendar";

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

function InputField({
    placeholder,
    type,
    icon,
    disabled = false,
    error = false,
    inputClassName = "",
}: {
    placeholder: string;
    type: string;
    icon: React.ReactNode;
    disabled?: boolean;
    error?: boolean;
    inputClassName?: string;
}) {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const incompleteAlertShown = useRef(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    if (type === "date") {
        const handleClickOutside = (e: MouseEvent) => {
            // Only process if clicking outside the calendar
            if (
                calendarRef.current &&
                !calendarRef.current.contains(e.target as Node)
            ) {
                // Check if selection is complete
                const isSelectionComplete = startDate && endDate;
                const isNoSelection = !startDate && !endDate;

                if (isSelectionComplete || isNoSelection) {
                    // Close calendar if selection is complete or no selection made
                    setShowCalendar(false);
                    document.removeEventListener(
                        "mousedown",
                        handleClickOutside
                    );
                    incompleteAlertShown.current = false; // Reset for next time
                } else if (!incompleteAlertShown.current) {
                    // If only start date is selected and alert not shown yet, show visual indicator
                    const calendarElement = calendarRef.current;
                    if (
                        calendarElement &&
                        !calendarElement.classList.contains(
                            "incomplete-selection"
                        )
                    ) {
                        calendarElement.classList.add("incomplete-selection");
                        incompleteAlertShown.current = true; // Mark as shown

                        // Remove the class after animation completes
                        setTimeout(() => {
                            if (calendarElement) {
                                calendarElement.classList.remove(
                                    "incomplete-selection"
                                );
                            }
                        }, 1000);
                    }
                }
            }
        };

        const toggleCalendar = () => {
            const newState = !showCalendar;
            setShowCalendar(newState);

            if (newState) {
                // Reset the incomplete alert state when opening calendar
                if (calendarRef.current) {
                    calendarRef.current.classList.remove(
                        "incomplete-selection"
                    );
                }

                // Add event listener when calendar is shown
                setTimeout(() => {
                    document.addEventListener("mousedown", handleClickOutside);
                }, 0);
            } else {
                // Remove event listener when calendar is hidden
                document.removeEventListener("mousedown", handleClickOutside);
            }
        };

        // Format date range for display
        const formatDateRange = () => {
            if (startDate && endDate) {
                return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
            } else if (startDate) {
                return `${startDate.toLocaleDateString()} - Select end date`;
            } else {
                return placeholder || "Select date range";
            }
        };

        // Handle date selection
        const handleDateSelect = (date: Date, isEndDate: boolean = false) => {
            if (isEndDate) {
                setEndDate(date);
            } else {
                setStartDate(date);
                setEndDate(null); // Reset end date when selecting a new start date
            }
        };

        // Handle range selection
        const handleRangeSelect = (start: Date, end: Date) => {
            setStartDate(start);
            setEndDate(end);
        };

        return (
            <div
                className={`peer justify-start relative flex items-center gap-2 min-w-[200px] rounded-3xl py-5 px-3 ${
                    error
                        ? "form-error cursor-pointer"
                        : disabled
                        ? "border-gray-300 bg-dark-50 cursor-not-allowed opacity-50"
                        : "cursor-pointer"
                }`}
                style={{
                    border:
                        showCalendar && !disabled
                            ? "2px solid var(--color-primary-500)"
                            : "1px solid var(--color-gray-200)",
                }}
                onClick={toggleCalendar}
            >
                {icon}

                <span
                    className={`${
                        !startDate ? "text-gray-400" : "text-gray-900"
                    } ${error ? "text-red-500" : ""}`}
                >
                    {formatDateRange()}
                </span>

                {showCalendar && !disabled && (
                    <div
                        ref={calendarRef}
                        className="absolute top-18 left-1/2 -translate-x-1/2 z-50 mt-1 transition-all duration-300"
                    >
                        <Calendar
                            initialDate={startDate || new Date()}
                            onDateSelect={handleDateSelect}
                            rangeSelect={true}
                            onRangeSelect={handleRangeSelect}
                        />
                    </div>
                )}

                <input
                    type="hidden"
                    value={startDate ? startDate.toISOString() : ""}
                    name="start_date"
                    className={`peer form-input ${error ? "form-error" : ""} ${
                        disabled
                            ? "border-gray-300 bg-dark-50 cursor-not-allowed opacity-50"
                            : ""
                    } ${inputClassName}`}
                    disabled={disabled}
                />
                <input
                    type="hidden"
                    value={endDate ? endDate.toISOString() : ""}
                    name="end_date"
                    className="hidden"
                    disabled={disabled}
                />
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 w-[200px] border border-gray-200 rounded-3xl p-3">
            {icon}
            <div>
                <div className="text-xs text-gray-500">{placeholder}</div>
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`${error ? "form-error" : ""} ${
                        disabled
                            ? "border-gray-300 bg-dark-50 cursor-not-allowed opacity-50"
                            : ""
                    } ${inputClassName}`}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}

function BookingSearch() {
    const [activeBtn, setActiveBtn] = useState(0);
    const [tripType, setTripType] = useState("roundtrip");
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
    // Flight search form component
    const FlightSearchForm = () => (
        <div className="p-4">
            <div className="flex justify-start gap-4 mb-4">
                <TripOption
                    label="Round-trip"
                    isActive={tripType === "roundtrip"}
                    onClick={() => setTripType("roundtrip")}
                />
                <TripOption
                    label="One-Way"
                    isActive={tripType === "oneway"}
                    onClick={() => setTripType("oneway")}
                />
                <TripOption
                    label="Multi-City"
                    isActive={tripType === "multicity"}
                    onClick={() => setTripType("multicity")}
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
                            className="absolute top-10 left-1/2 -translate-x-1/2 w-full bg-white shadow-lg py-1 rounded-xl"
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
                    />
                </div>

                <InputField
                    placeholder="Dates"
                    type="date"
                    icon={
                        <i className="far fa-calendar-days text-primary-500" />
                    }
                />

                <InputField
                    placeholder="Travelers"
                    type="text"
                    icon={<i className="far fa-user text-primary-500" />}
                />
                <button className="bg-primary-500 text-white px-8 py-3 rounded-2xl font-medium">
                    Search
                </button>
            </div>
        </div>
    );

    // Hotel search form component
    const HotelSearchForm = () => (
        <div className="p-4">
            <div className="w-full flex justify-between items-center gap-4">
                <InputField
                    placeholder="Where to?"
                    type="text"
                    icon={
                        <i className="far fa-location-dot text-primary-500" />
                    }
                />

                <InputField
                    placeholder="Dates"
                    type="date"
                    icon={
                        <i className="far fa-calendar-days text-primary-500" />
                    }
                />

                <InputField
                    placeholder="Travelers"
                    type="text"
                    icon={<i className="far fa-user text-primary-500" />}
                />

                <button className="bg-primary-500 text-white px-8 py-3 rounded-2xl font-medium">
                    Search
                </button>
            </div>
        </div>
    );

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
