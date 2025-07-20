import { useState } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format as dateFnsFormat } from "date-fns";

// Utility function for date formatting that can be used throughout the app
export const formatDate = {
    // Format date as YYYY-MM-DD HH:MM:SS (for API requests)
    apiFormat: (date: Date): string => {
        return dateFnsFormat(date, "yyyy-MM-dd HH:mm:ss");
    },

    // Format date as readable date (e.g., Jan 15, 2023)
    readableDate: (date: Date): string => {
        return dateFnsFormat(date, "PP");
    },

    // Format date as short date in dd/mm/yy format
    shortDate: (date: Date): string => {
        return dateFnsFormat(date, "dd/MM/yy");
    },

    // Format date with time (e.g., Jan 15, 2023 14:30)
    dateTime: (date: Date): string => {
        return dateFnsFormat(date, "PPp");
    },
};

interface CalendarProps {
    initialDate?: Date;
    onDateSelect?: (date: Date, isEndDate?: boolean) => void;
    highlightedDates?: Date[];
    className?: string;
    rangeSelect?: boolean;
    onRangeSelect?: (startDate: Date, endDate: Date) => void;
}

const calendarStyles = cva("bg-white rounded-3xl p-6 shadow-sm w-fit", {
    variants: {
        size: {
            default: "w-[350px]",
            small: "w-[280px]",
            large: "w-[420px]",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

const dayStyles = cva(
    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors",
    {
        variants: {
            variant: {
                default: "text-gray-500 hover:bg-gray-100",
                weekend: "text-red-500 hover:bg-gray-100",
                selected: "bg-primary-500 text-white hover:bg-primary-600",
                highlighted: "bg-primary-100/60 text-gray-700 hover:bg-primary-200",
                inactive: "text-gray-300",
                today: "text-gray-900 font-bold",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

const Calendar = ({
    initialDate = new Date(),
    onDateSelect,
    highlightedDates = [],
    className,
    rangeSelect = true, // Default to true for range selection
    onRangeSelect,
}: CalendarProps) => {
    const [startDate, setStartDate] = useState<Date | null>(initialDate); // Start date for range
    const [endDate, setEndDate] = useState<Date | null>(null); // End date for range
    const [currentDate, setCurrentDate] = useState(new Date()); // Current month view
    const [selectionPhase, setSelectionPhase] = useState<"start" | "end">(
        "start"
    ); // Track selection phase

    // Get the current month and year
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get the first day of the month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const dayOfWeek =
        firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1; // Adjust for Monday start

    // Get the number of days in the month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Generate month name
    const monthName = new Intl.DateTimeFormat("en-US", {
        month: "long",
    }).format(currentDate);

    // Generate days of the week
    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];

    // Handle date selection
    const handleDateClick = (e: React.MouseEvent, day: number) => {
        e.stopPropagation(); // Prevent event bubbling

        const newDate = new Date(currentYear, currentMonth, day);

        // Don't allow selection of dates before today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (newDate < today) {
            return;
        }

        if (rangeSelect) {
            if (selectionPhase === "start") {
                // First click - set start date
                setStartDate(newDate);
                setEndDate(null);
                setSelectionPhase("end");

                if (onDateSelect) {
                    onDateSelect(newDate, false);
                }
            } else {
                // Second click - set end date
                // Ensure end date is not before start date
                if (startDate && newDate < startDate) {
                    // If selected date is before start date, swap them
                    setEndDate(startDate);
                    setStartDate(newDate);
                } else {
                    setEndDate(newDate);
                }

                setSelectionPhase("start"); // Reset for next selection

                if (onDateSelect) {
                    onDateSelect(newDate, true);
                }

                // Call range selection callback with both dates
                if (onRangeSelect && startDate) {
                    const finalStartDate =
                        newDate < startDate ? newDate : startDate;
                    const finalEndDate =
                        newDate < startDate ? startDate : newDate;
                    onRangeSelect(finalStartDate, finalEndDate);
                }
            }
        } else {
            // Single date selection mode
            if (onDateSelect) {
                onDateSelect(newDate);
            }
        }
    };

    // Check if a date is highlighted
    const isHighlighted = (day: number) => {
        // Check if the day is in the highlightedDates array
        const isInHighlightedArray = highlightedDates.some(
            (date) =>
                date.getDate() === day &&
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
        );

        // Check if the day is in the range between startDate and endDate
        let isInRange = false;
        if (rangeSelect && startDate && endDate) {
            const currentDate = new Date(currentYear, currentMonth, day);
            const minDate = startDate < endDate ? startDate : endDate;
            const maxDate = startDate < endDate ? endDate : startDate;

            isInRange = currentDate > minDate && currentDate < maxDate;
        }

        // Return true if any condition is met
        return isInHighlightedArray || isInRange;
    };

    // Helper function to check if two dates are the same day
    const isSameDay = (date1: Date, date2: Date) => {
        return (
            date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear()
        );
    };

    // Check if a date is selected (either start or end date)
    const isSelected = (day: number) => {
        const dayDate = new Date(currentYear, currentMonth, day);

        return (
            (startDate && isSameDay(dayDate, startDate)) ||
            (endDate && isSameDay(dayDate, endDate))
        );
    };

    // Check if a date is a weekend
    const isWeekend = (dayIndex: number) => {
        const weekdayIndex = (dayIndex + dayOfWeek) % 7;
        return weekdayIndex === 5 || weekdayIndex === 6; // Saturday or Sunday
    };

    // Check if a date is today
    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    // Generate calendar grid
    const generateCalendarGrid = () => {
        const days = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < dayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
        }

        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            // Check if date is before today (to disable past dates)
            const currentDayDate = new Date(currentYear, currentMonth, day);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isPastDate = currentDayDate < today;

            let variant:
                | "default"
                | "weekend"
                | "selected"
                | "highlighted"
                | "inactive"
                | "today" = "default";

            if (isPastDate) {
                variant = "inactive";
            } else if (isSelected(day)) {
                variant = "selected";
            } else if (isHighlighted(day)) {
                variant = "highlighted";
            } else if (isToday(day)) {
                variant = "today";
            } else if (isWeekend((dayOfWeek + day - 1) % 7)) {
                variant = "weekend";
            }

            days.push(
                <button
                    key={`day-${day}`}
                    onClick={(e) => handleDateClick(e, day)}
                    className={dayStyles({ variant })}
                    disabled={isPastDate}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    // Navigate to previous month
    const goToPreviousMonth = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    // Navigate to next month
    const goToNextMonth = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Navigate to previous year
    const goToPreviousYear = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        setCurrentDate(new Date(currentYear - 1, currentMonth, 1));
    };

    // Navigate to next year
    const goToNextYear = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent event bubbling
        setCurrentDate(new Date(currentYear + 1, currentMonth, 1));
    };

    return (
        <div className={twMerge(calendarStyles(), `${className} relative`)}>
            {/* Corners */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-500 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-500 rounded-bl-3xl" />

            <div className="flex items-center justify-between mb-4">
                <button
                    type="button"
                    onClick={goToPreviousYear}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label="Previous Year"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                </button>
                <button
                    type="button"
                    onClick={goToPreviousMonth}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label="Previous Month"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                <h2 className="text-xl font-medium">
                    {monthName} {currentYear}
                </h2>

                <button
                    type="button"
                    onClick={goToNextMonth}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label="Next Month"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    onClick={goToNextYear}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label="Next Year"
                >
                    <ChevronRight className="w-4 h-4 mr-1" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day, index) => (
                    <div
                        key={`day-header-${index}`}
                        className={`text-center text-sm font-medium ${
                            index >= 5 ? "text-red-500" : "text-gray-700"
                        }`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
                {generateCalendarGrid()}
            </div>
        </div>
    );
};

export default Calendar;
