import React, { useState } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "../styles/_custom.css"

export const DatePicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const handleDatesChange = ({ startDate, endDate }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    };
    return (
        <div className="App" id="date-picker">
            <DateRangePicker
                startDate={startDate}
                startDateId="range-start-date"
                endDate={endDate}
                endDateId="range-end-date"
                onDatesChange={handleDatesChange}
                focusedInput={focusedInput}
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
            />
        </div>
    );
}

export default DatePicker;
