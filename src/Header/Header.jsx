import React, { useState } from 'react';
import ButtonAddIvent from '../ButtonAddIvent/ButtonAddIvent';
import DatePickerSection from '../DatePickerSection/DatePickerSection';
import EventForm from '../EventForm/EventForm';
import styles from './Header.module.css';
import { useDispatch } from 'react-redux';
import { addEvent } from '../redux/events/events-slice';
//--
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
    dispatch(addEvent(data));
  };
  return (
    <header className={styles.header}>
      <ButtonAddIvent handler={handlOpen} />
      {modalIsOpen && (
        <EventForm onClose={handlClose} handlerForm={addSubmit} />
      )}
      <DatePickerSection />
    </header>
  );
}
