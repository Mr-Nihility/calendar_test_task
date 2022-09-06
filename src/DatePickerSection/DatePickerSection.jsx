import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './DatePickerSection.module.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { updateDate } from 'redux/events/events-slice';
import { getSelectedDate } from 'redux/events/events-selectors';
//-------------------------------------------------------------//
export default function DatePickerSection() {
  const currentDate = useSelector(getSelectedDate);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!currentDate) {
      return;
    }

    setSelectedDate(new Date(currentDate));
  }, [currentDate]);

  const setDateToStore = date => {
    dispatch(updateDate(moment(date).format('MM/DD/YYYY')));
  };
  const nextMonth = () => {
    dispatch(
      updateDate(moment(selectedDate).add(1, 'month').format('MM/DD/YYYY'))
    );
  };
  const prevMonth = () => {
    dispatch(
      updateDate(moment(selectedDate).subtract(1, 'month').format('MM/DD/YYYY'))
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.month}>
        <button type="button" className={styles.btn} onClick={prevMonth}>
          {'<'}
        </button>
        <p className={styles.monthText}>
          {selectedDate
            ? moment(selectedDate).format('MMMM')
            : moment(new Date()).format('MMMM')}
        </p>
        <button type="button" className={styles.btn} onClick={nextMonth}>
          {'>'}
        </button>
      </div>
      <DatePicker
        // dateFormat="yyyy.MM.dd"
        selected={selectedDate ? selectedDate : new Date()}
        onChange={setDateToStore}
        // placeholderText={"MM-DD-YYYY"}
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
}
