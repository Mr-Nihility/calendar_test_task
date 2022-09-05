import React from "react";
// import { useDispatch } from "react-redux";
import CalendarItem from "../CalendarItem/CalendarItem";
import moment from "moment";
import styles from "./Calendar.module.css";
//----------------------------------------------//
export default function Calendar() {
  // const dispath = useDispatch();
  // console.log(moment("8/3/2022").format("MM-DD-YYYY"));
  moment.updateLocale("en", { week: { dow: 1, doy: 7 } });
  const startDay = moment().startOf("month").startOf("week");
  const endDay = moment().endOf("month").endOf("week");

  const calendar = [];
  const day = startDay.clone();

  while (!day.isAfter(endDay)) {
    calendar.push(day.clone());
    day.add(1, "day");
  }

  return (
    <ul className={styles.calendarList}>
      {calendar.map((item, i) => {
        return (
          <CalendarItem
            key={i}
            date={item}
            isToday={moment().format("L") === item.format("L")}
          />
        );
      })}
    </ul>
  );
}
