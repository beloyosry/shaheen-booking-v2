import { useRef, useState } from "react";
import Calendar from "./index";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface DatePickerProps {
    value?: Date | null;
    onChange?: (date: Date) => void;
    label?: string;
    className?: string;
}

function DatePicker({
    value,
    onChange,
    label = "Select date",
    className = "",
}: DatePickerProps) {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (e: MouseEvent) => {
        if (
            calendarRef.current &&
            !calendarRef.current.contains(e.target as Node)
        ) {
            setShowCalendar(false);
            document.removeEventListener("mousedown", handleClickOutside);
        }
    };

    const toggleCalendar = () => {
        const newState = !showCalendar;
        setShowCalendar(newState);

        if (newState) {
            // Add event listener when calendar is shown
            setTimeout(() => {
                document.addEventListener("mousedown", handleClickOutside);
            }, 0);
        } else {
            // Remove event listener when calendar is hidden
            document.removeEventListener("mousedown", handleClickOutside);
        }
    };

    // Handle date selection
    const handleDateSelect = (date: Date) => {
        if (onChange) {
            onChange(date);
        }
        setShowCalendar(false);
    };

    return (
        <div className="relative w-full">
            <div
                className={`peer flex items-center justify-between rounded-full px-4 py-2 cursor-pointer gap-2 ${className}`}
                style={{
                    border: showCalendar
                        ? "2px solid var(--color-primary-500)"
                        : "2px solid var(--color-dark-50)",
                }}
                onClick={toggleCalendar}
            >
                <CalendarIcon
                    className={`h-5 w-5 ${
                        showCalendar ? "text-primary-500" : "text-dark-50"
                    }`}
                />
                <span
                    className={`${!value ? "text-gray-400" : "text-gray-900"}`}
                >
                    {value ? format(new Date(value), "PP") : label}
                </span>
            </div>

            {showCalendar && (
                <div ref={calendarRef} className="absolute z-50 mt-1">
                    <Calendar
                        initialDate={value ? new Date(value) : new Date()}
                        onDateSelect={handleDateSelect}
                    />
                </div>
            )}

            <input type="hidden" className="peer form-input" />
        </div>
    );
}

export default DatePicker;
