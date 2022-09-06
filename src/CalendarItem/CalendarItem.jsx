import moment from 'moment/moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { getEventsFromStore } from 'redux/events/events-selectors';
import styles from './CalendarItem.module.css';

//-----------------------------------------------------//
export default function CalendarItem({ date, isToday }) {
  const eventList = useSelector(getEventsFromStore);

  const getEventsToRender = () => {
    return eventList.filter(item => {
      return item.date === moment(date).format('DD.MM.YYYY');
    });
  };

  return (
    <li
      className={
        isToday ? `${styles.calendarItem} ${styles.today}` : styles.calendarItem
      }
    >
      <div className={styles.calendarMeta}>
        <p>{+date.format('DD')}</p>
        <p> {date.format('dddd').slice(0, 3)}</p>
      </div>
      {!!getEventsToRender()?.length && (
        <ul className={styles.eventlist}>
          {getEventsToRender().map(({ id, title }) => {
            return (
              <li
                key={id}
                className={styles.eventItem}
                onClick={e => {
                  console.log(e.target.textContent);
                }}
              >
                {title}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
