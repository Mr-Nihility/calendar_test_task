import React, { useState } from 'react';
import ButtonAddIvent from '../ButtonAddIvent/ButtonAddIvent';
import DatePickerSection from '../DatePickerSection/DatePickerSection';
import EventForm from '../EventForm/EventForm';
import styles from './Header.module.css';
import { useDispatch } from 'react-redux';
import { addEvent, updateDate } from '../redux/events/events-slice';
import moment from 'moment/moment';

//---------------------------------------------------------------------------//
export default function Header() {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handlOpen = () => {
    setModalIsOpen(true);
  };

  const handlClose = () => {
    setModalIsOpen(false);
  };

  const addSubmit = data => {
    data.createdAt = moment().format('D.M.YYYY HH:mm');
    dispatch(addEvent(data));
  };

  const goTodayHandler = () => {
    dispatch(updateDate(moment().format('MM/DD/YYYY')));
  };

  return (
    <header className={styles.header}>
      <ButtonAddIvent handler={handlOpen} goTodayHandler={goTodayHandler} />
      {modalIsOpen && (
        <EventForm onClose={handlClose} handlerForm={addSubmit} />
      )}
      <DatePickerSection />
    </header>
  );
}
