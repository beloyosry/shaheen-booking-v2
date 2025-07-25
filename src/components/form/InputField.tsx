import { useRef, useState, type InputHTMLAttributes } from "react";
import Calendar from "../ui/Calendar";
import {
    type Control,
    Controller,
    type FieldValues,
    type Path,
} from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface FormInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    placeholder: string;
    type: InputHTMLAttributes<HTMLInputElement>["type"];
    icon?: React.ReactNode;
    required?: boolean;
    requiredLabel?: string;
    disabled?: boolean;
    error?: boolean;
    inputClassName?: string;
    readOnly?: boolean;
    valueToSet?: string | number; // Value to set in array fields for checkboxes
    amenity?: {
        icon: string;
        title: string;
    };
}

export default function InputField<T extends FieldValues>({
    control,
    placeholder,
    type,
    icon,
    required = false,
    requiredLabel,
    disabled = false,
    error = false,
    inputClassName = "",
    name,
    readOnly = false,
    valueToSet,
    amenity,
}: FormInputProps<T>) {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const incompleteAlertShown = useRef(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    // Determine the actual input type
    const inputType = isPasswordField
        ? showPassword
            ? "text"
            : "password"
        : type;

    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    if (type === "date") {
                        // Handle clicking outside calendar to close it
                        const handleClickOutside = (e: MouseEvent) => {
                            // Only process if clicking outside the calendar
                            if (
                                calendarRef.current &&
                                !calendarRef.current.contains(e.target as Node)
                            ) {
                                // Check if selection is complete
                                const isSelectionComplete =
                                    startDate && endDate;
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
                                        calendarElement.classList.add(
                                            "incomplete-selection"
                                        );
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

                        // Toggle calendar visibility
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
                                    document.addEventListener(
                                        "mousedown",
                                        handleClickOutside
                                    );
                                }, 0);
                            } else {
                                // Remove event listener when calendar is hidden
                                document.removeEventListener(
                                    "mousedown",
                                    handleClickOutside
                                );
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
                        const handleDateSelect = (
                            date: Date,
                            isEndDate: boolean = false
                        ) => {
                            if (isEndDate) {
                                // Update the field value with the selected date range
                                if (startDate) {
                                    // Set both start and end dates in the field value
                                    const dateRange = {
                                        startDate: startDate,
                                        endDate: date,
                                    };

                                    // Update state and form field
                                    setEndDate(date);
                                    field.onChange(dateRange);

                                    console.log(
                                        "Date range selected:",
                                        dateRange
                                    );
                                }
                            } else {
                                // Create date range with only start date
                                const dateRange = {
                                    startDate: date,
                                    endDate: null,
                                };

                                // Update state and form field
                                setStartDate(date);
                                setEndDate(null); // Reset end date when selecting a new start date
                                field.onChange(dateRange);

                                console.log("Start date selected:", dateRange);
                            }
                        };

                        // Handle range selection
                        const handleRangeSelect = (start: Date, end: Date) => {
                            setStartDate(start);
                            setEndDate(end);
                            // Update the form field with both dates
                            field.onChange({
                                startDate: start,
                                endDate: end,
                            });
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
                                onClick={(e) => {
                                    // Prevent default behavior and stop propagation
                                    e.preventDefault();
                                    e.stopPropagation();

                                    // Prevent any form submission by stopping event bubbling completely
                                    const event = e.nativeEvent;
                                    if (event.stopImmediatePropagation) {
                                        event.stopImmediatePropagation();
                                    }

                                    // Toggle calendar visibility
                                    toggleCalendar();

                                    // Return false to prevent any form submission
                                    return false;
                                }}
                            >
                                {icon}

                                <span
                                    className={`${
                                        !startDate
                                            ? "text-gray-400"
                                            : "text-gray-900"
                                    } ${error ? "text-red-500" : ""}`}
                                >
                                    {formatDateRange()}
                                </span>

                                {showCalendar && !disabled && (
                                    <div
                                        ref={calendarRef}
                                        className="absolute top-18 left-1/2 -translate-x-1/2 z-50 mt-1 transition-all duration-300"
                                        onClick={(e) => {
                                            // Prevent any form submission when clicking on calendar
                                            e.preventDefault();
                                            e.stopPropagation();
                                            const event = e.nativeEvent;
                                            if (
                                                event.stopImmediatePropagation
                                            ) {
                                                event.stopImmediatePropagation();
                                            }
                                        }}
                                    >
                                        <Calendar
                                            initialDate={
                                                startDate || new Date()
                                            }
                                            onDateSelect={handleDateSelect}
                                            rangeSelect={true}
                                            onRangeSelect={handleRangeSelect}
                                        />
                                    </div>
                                )}

                                <input
                                    type="hidden"
                                    {...field}
                                    value={
                                        field.value !== null &&
                                        field.value !== undefined
                                            ? field.value
                                            : ""
                                    }
                                    className={`peer form-input ${
                                        error ? "form-error" : ""
                                    } ${
                                        disabled
                                            ? "border-gray-300 bg-dark-50 cursor-not-allowed opacity-50"
                                            : ""
                                    } ${inputClassName}`}
                                    disabled={disabled}
                                />
                            </div>
                        );
                    } else if (type === "checkbox") {
                        // Handle array fields with valueToSet
                        if (
                            valueToSet !== undefined &&
                            Array.isArray(field.value)
                        ) {
                            const isChecked = field.value.includes(valueToSet);

                            const handleToggle = () => {
                                if (isChecked) {
                                    // Remove value from array
                                    const newValue = field.value.filter(
                                        (v: string | number) => v !== valueToSet
                                    );
                                    field.onChange(newValue);
                                } else {
                                    // Add value to array
                                    field.onChange([
                                        ...field.value,
                                        valueToSet,
                                    ]);
                                }
                            };

                            if (amenity)
                                return (
                                    <span
                                        onClick={handleToggle}
                                        className={`group px-2 py-1 cursor-pointer truncate ${
                                            isChecked
                                                ? "bg-primary-50 border border-primary-500"
                                                : "bg-white border border-gray-200"
                                        } text-xs text-gray-700 rounded-full hover:bg-primary-50 hover:text-primary-500 transition-colors duration-300 ease-in-out`}
                                    >
                                        {amenity.icon && (
                                            <i
                                                className={`${amenity.icon} ${
                                                    isChecked
                                                        ? "text-primary-500"
                                                        : "text-gray-500"
                                                } mr-0.5 group-hover:text-primary-500 transition-colors duration-300 ease-in-out`}
                                            />
                                        )}{" "}
                                        {icon && icon} {amenity.title}
                                    </span>
                                );

                            return (
                                <label
                                    onClick={handleToggle}
                                    className="flex items-center cursor-pointer"
                                >
                                    <div
                                        className={`flex h-4 w-4 items-center justify-center rounded border cursor-pointer ${
                                            isChecked
                                                ? "border-primary-500 bg-primary-500"
                                                : "border-dark-200 bg-white"
                                        }`}
                                        role="checkbox"
                                        aria-checked={
                                            isChecked ? "true" : "false"
                                        }
                                        aria-label="Select row"
                                        title="Select row"
                                    >
                                        {isChecked && (
                                            <svg
                                                className="w-3 h-3 text-white"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>

                                    {placeholder && (
                                        <span className="ml-2 text-sm text-gray-700">
                                            {placeholder}
                                        </span>
                                    )}
                                </label>
                            );
                        } else {
                            // Regular boolean checkbox
                            return (
                                <label className="flex items-center cursor-pointer">
                                    <div
                                        className={`flex h-4 w-4 items-center justify-center rounded border cursor-pointer ${
                                            field.value
                                                ? "border-primary-500 bg-primary-500"
                                                : "border-dark-200 bg-white"
                                        }`}
                                        onClick={() =>
                                            field.onChange(!field.value)
                                        }
                                        role="checkbox"
                                        aria-checked={
                                            field.value ? "true" : "false"
                                        }
                                        aria-label="Select row"
                                        title="Select row"
                                    >
                                        {field.value && (
                                            <svg
                                                className="w-3 h-3 text-white"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </div>

                                    {placeholder && (
                                        <span className="ml-2 text-sm text-gray-700">
                                            {placeholder}
                                        </span>
                                    )}
                                </label>
                            );
                        }
                    } else if (type === "amenities" && amenity) {
                        return (
                            <span className="px-2 py-1 bg-primary-50 border border-primary-500 text-xs text-gray-700 rounded-full">
                                <i
                                    className={`${amenity.icon} text-primary-500 mr-0.5`}
                                />{" "}
                                {amenity.title}
                            </span>
                        );
                    } else {
                        return (
                            <div className="flex items-center gap-2 w-[200px] border border-gray-200 rounded-3xl p-3">
                                {icon}

                                <div>
                                    <div className="text-xs text-gray-500">
                                        {placeholder}
                                    </div>

                                    <input
                                        {...field}
                                        type={inputType}
                                        className={`peer form-input ${
                                            error ? "form-error" : ""
                                        } ${
                                            disabled
                                                ? "border-gray-300 bg-dark-50 cursor-not-allowed opacity-50"
                                                : ""
                                        } ${inputClassName}`}
                                        placeholder={placeholder}
                                        required={required}
                                        disabled={disabled}
                                        readOnly={readOnly}
                                    />
                                </div>
                            </div>
                        );
                    }
                }}
            />

            {isPasswordField && (
                <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-400"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? (
                        <EyeOffIcon size={18} />
                    ) : (
                        <EyeIcon size={18} />
                    )}
                </button>
            )}

            {error && (
                <span className="form-error text-left ml-5">*{error}</span>
            )}

            {requiredLabel && (
                <span className="form-error text-left ml-5 text-primary-500">
                    *{requiredLabel}
                </span>
            )}
        </>
    );
}
