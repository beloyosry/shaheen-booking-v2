import { useState } from "react";
import Calendar from "./index";

const CalendarDemo = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        console.log("Selected date:", date.toLocaleDateString());
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Calendar Component</h1>
            <Calendar
                initialDate={new Date()}
                onDateSelect={handleDateSelect}
            />

            <div className="mt-6">
                <p>Selected date: {selectedDate.toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default CalendarDemo;
