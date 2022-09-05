import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePickerSection.module.css";
import moment from "moment";
//-------------------------------------------------------------//
export default function DatePickerSection() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className={styles.wrapper}>
      <div className={styles.month}>
        <button type="button" className={styles.btn}>
          {"<"}
        </button>
        <p className={styles.date}>
          {selectedDate
            ? moment(selectedDate).format("MMMM")
            : moment(new Date()).format("MMMM")}
        </p>
        <button type="button" className={styles.btn}>
          {">"}
        </button>
      </div>
      <DatePicker
        dateFormat="yyyy.MM.dd"
        selected={selectedDate ? selectedDate : new Date()}
        onChange={(date) => {
          setSelectedDate(date);
          console.log(moment(date).format("MM-DD-YYYY"));
        }}
        placeholderText={"MM-DD-YYYY"}
        showYearDropdown // year show and scrolldown alos
        scrollableYearDropdown
      />
    </div>
  );
}
