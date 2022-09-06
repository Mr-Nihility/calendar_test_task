import React, { useEffect, useState } from 'react';
import styles from './EventForm.module.css';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { nanoid } from 'nanoid';
import ReactDOM from 'react-dom';
window.moment = moment;
//------------------------------------------//
export default function EventForm({
  onClose,
  handlerForm,
  event = null,
  delEvent = null,
}) {
  //state
  const [title, setTitle] = useState(event ? event.title : '');
  const [description, setDescription] = useState(
    event ? event.description : ''
  );
  const [date, setDate] = useState(event ? new Date(event.date) : new Date());

  // console.log(moment(event.date).format('MM.DD.YYYY'));

  const [time, setTime] = useState(
    event ? new Date(moment(`${event.date} ${event.time}`)) : new Date()
  );
  //dispatch

  //use 1
  useEffect(() => {
    const handlCloseEsc = e => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener('keydown', handlCloseEsc);
    return () => {
      window.removeEventListener('keydown', handlCloseEsc);
    };
  }, [onClose]);

  const handleOnBackDrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  //use 2
  // useEffect(() => {

  // }, [])

  const handlerChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };
  const handlerSubmit = e => {
    e.preventDefault();
    const eventData = {
      title,
      description,
      date: moment(date).format('MM/DD/YYYY'),
      time: moment(time).format('HH:mm'),
      createdAt: event ? event.createdAt : moment().format('D.M.YYYY HH:mm'),
      id: event ? event.id : nanoid(),
    };
    console.log(eventData);
    handlerForm(eventData);
  };

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={handleOnBackDrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.clsBtn} onClick={onClose}>
          X
        </button>
        <form className={styles.form} onSubmit={handlerSubmit}>
          <b className={styles.title}>Add new event</b>
          {event && (
            <span className={styles.subtitle}>
              Created at : {event.createdAt}
            </span>
          )}
          {event?.updatedAt && (
            <span className={styles.subtitle}>
              Updated at : {event.updatedAt}
            </span>
          )}
          <label className={styles.label}>
            Title*
            <input
              type="text"
              className={styles.input}
              name="title"
              value={title}
              onChange={handlerChange}
            />
          </label>
          <label className={styles.label}>
            Description
            <textarea
              type="text"
              className={styles.descr}
              name="description"
              value={description}
              onChange={handlerChange}
            />
          </label>
          <div className={styles.inputWrap}>
            <label>
              <span className={styles.subtitle}>Date*</span>
              <DatePicker
                className={styles.inputDate}
                selected={date}
                // dateFormat="MM/dd/yyyy"
                onChange={selectedDate => setDate(selectedDate)}
              />
            </label>
            <label>
              <span className={styles.subtitle}>Begin time</span>
              <DatePicker
                selected={time}
                className={styles.inputTime}
                onChange={selectedTime => setTime(selectedTime)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
              />
            </label>
          </div>
          <div className={styles.btnwrap}>
            {event && (
              <button
                type="button"
                className={styles.delBtn}
                onClick={() => delEvent(event.id)}
              >
                del
              </button>
            )}
            <button type="submit" className={styles.submitBtn}>
              SAVE
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
