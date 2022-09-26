import React, { useState } from 'react';
import ButtonAddEvent from '../ButtonAddIvent/ButtonAddIvent';
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

  const handleOpen = () => {
    setModalIsOpen(true);
  };

  const handleClose = () => {
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
      <ButtonAddEvent handler={handleOpen} goTodayHandler={goTodayHandler} />
      {modalIsOpen && (
        <EventForm onClose={handleClose} handlerForm={addSubmit} />
      )}
      <DatePickerSection />
    </header>
  );
}
