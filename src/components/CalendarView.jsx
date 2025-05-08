// src/components/CalendarView.jsx
import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { isSameDay, parseISO } from "date-fns";

/**
 * CalendarView
 * • Shows due-dates (and later pay-dates) on a calendar.
 * • Highlights bills using dot markers.
 */
const CalendarView = ({ bills }) => {
  // Extract all due dates:
  const markedDates = bills
    .filter(b => b.dueDate)
    .map(b => parseISO(b.dueDate));

  // Tile content: a dot if the date matches a bill due
  const tileContent = ({ date, view }) => {
    if (view === 'month' && markedDates.some(d => isSameDay(d, date))) {
      return <div className="calendar-dot" />;
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2">Bill Calendar</h2>
      <Calendar
        tileContent={tileContent}
        // calendarType="ISO 8601" /* Removed to use default */
      />
      <style jsx>{`
        .calendar-dot {
          height: 6px;
          width: 6px;
          background: #f59e0b; /* amber-500 */
          border-radius: 50%;
          margin: 0 auto;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
};

export default CalendarView;
