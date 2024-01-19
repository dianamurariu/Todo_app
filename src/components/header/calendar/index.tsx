import React, { useState, useEffect } from "react";
import styles from "./calendar.module.css";
import { dimensionsIcons } from "../../../config";
import { formatCurrentDate } from "../../utils/calendarUtils";

const Calendar = () => {
  // State to hold the formatted date
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    // Get the current date
    const currentDate = new Date();
    // Format the current date using a utility function
    setFormattedDate(formatCurrentDate(currentDate));
  }, []);

  return (
    <div className={styles.calendar} data-testid="calendar-component">
      <img
        src="images/calendar.png"
        alt="calendar-icon"
        width={dimensionsIcons.large}
        height={dimensionsIcons.large}
        data-testid="calendar-image"
      />
      <div className={styles.dateOverlay} data-testid="date-overlay">
        {formattedDate}
      </div>
    </div>
  );
};

export default Calendar;
