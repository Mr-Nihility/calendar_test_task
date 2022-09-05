import React from "react";
import styles from "./CalendarItem.module.css";

//-----------------------------------------------------//
export default function CalendarItem({ date, isToday }) {
  return (
    <li
      className={
        isToday ? `${styles.calendarItem} ${styles.today}` : styles.calendarItem
      }
    >
      <div className={styles.calendarMeta}>
        <p>{+date.format("DD")}</p>
        <p> {date.format("dddd").slice(0, 3)}</p>
      </div>

      <ul>
        <li></li>
      </ul>
    </li>
  );
}
