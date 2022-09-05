import React, { useEffect, useState } from "react";
import styles from "./EventForm.module.css";
import moment from "moment";
import DatePicker from "react-datepicker";
import { nanoid } from "nanoid";
//------------------------------------------//
export default function EventForm({ onClose, handlerForm }) {
  //state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  //use 1
  useEffect(() => {
    const handlCloseEsc = (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", handlCloseEsc);
    return () => {
      window.removeEventListener("keydown", handlCloseEsc);
    };
  }, [onClose]);

  const handleOnBackDrop = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  //use 2
  // useEffect(() => {

  // }, [])

  const handlerChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    const event = {
      title,
      description,
      date: moment(date).format("DD.MM.YYYY"),
      time: moment(date).format("HH:mm"),
      createdAt: moment().format("DD.MM.YYYY HH:mm"),
      id: nanoid(),
    };

    handlerForm(event);
  };
  return (
    <div className={styles.backdrop} onClick={handleOnBackDrop}>
      <div className={styles.modal}>
        <button type="button" className={styles.clsBtn} onClick={onClose}>
          X
        </button>
        <form className={styles.form} onSubmit={handlerSubmit}>
          <b className={styles.title}>Add new event</b>
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
                dateFormat="dd.MM.yyyy"
                onChange={(selectedDate) => setDate(selectedDate)}
              />
            </label>
            <label>
              <span className={styles.subtitle}>Begin time</span>
              <DatePicker
                selected={time}
                className={styles.inputTime}
                onChange={(date) => setTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="HH:mm"
              />
            </label>
          </div>

          <button type="submit" className={styles.submitBtn}>
            SAVE
          </button>
          {false && (
            <button type="button" className={styles}>
              del
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
