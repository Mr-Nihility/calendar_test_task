import CalendarCell from 'CalendarCell/CalendarCell';

import moment from 'moment/moment';

import { useSelector } from 'react-redux';
import { getEventsFromStore } from 'redux/events/events-selectors';
import styles from './CalendarItem.module.css';

//-----------------------------------------------------//
export default function CalendarItem({ date, isToday }) {
  const eventList = useSelector(getEventsFromStore);

  const getEventsToRender = () => {
    return eventList.filter(item => {
      return item.date === moment(date).format('MM/DD/YYYY');
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
          {getEventsToRender().map((item, i) => {
            return <CalendarCell key={item.id} event={item} i={i} />;
          })}
        </ul>
      )}
    </li>
  );
}
