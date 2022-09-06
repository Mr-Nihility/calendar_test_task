import CalendarCell from 'CalendarCell/CalendarCell';

import moment from 'moment/moment';

import { useSelector } from 'react-redux';
import {
  getEventsFromStore,
  getSelectedDate,
} from 'redux/events/events-selectors';
import styles from './CalendarItem.module.css';
let clsNms = require('classnames');
//-----------------------------------------------------//
export default function CalendarItem({
  date,
  isToday,
  isSelected,
  handlerDate,
}) {
  const eventList = useSelector(getEventsFromStore);
  const selectedDate = useSelector(getSelectedDate);

  const getEventsToRender = () => {
    return eventList
      .filter(item => {
        return item.date === moment(date).format('MM/DD/YYYY');
      })
      .sort((a, b) => +a.time.slice(0, 2) - +b.time.slice(0, 2));
  };

  const getClassItem = () => {
    clsNms = `${styles.calendarItem}`;
    if (isToday) {
      clsNms += ` ${styles.today}`;
    }
    if (isSelected) {
      clsNms += ` ${styles.selected}`;
    }

    if (
      moment(date).format('MMMM') !==
      moment(selectedDate ? selectedDate : new Date()).format('MMMM')
    ) {
      clsNms += ` ${styles.filter}`;
    }
    return clsNms;
  };

  return (
    <li
      className={getClassItem()}
      onClick={() => {
        handlerDate(date);
      }}
    >
      <div
        className={
          date.format('dddd').slice(0, 3) === 'Sat' ||
          date.format('dddd').slice(0, 3) === 'Sun'
            ? `${styles.calendarMeta} ${styles.red}`
            : styles.calendarMeta
        }
      >
        <p>{+date.format('DD')}</p>
        <p> {date.format('dddd').slice(0, 3).toUpperCase()}</p>
      </div>
      {!!getEventsToRender()?.length && (
        <ul className={styles.eventlist}>
          {getEventsToRender().map((item, i) => {
            return <CalendarCell key={item.id} event={item} i={i} />;
          })}
        </ul>
      )}
    </li>
  );
}
