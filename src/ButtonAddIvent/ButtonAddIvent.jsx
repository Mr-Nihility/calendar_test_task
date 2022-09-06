import React from 'react';
import styles from './ButtonAddIvent.module.css';
//--------------------------------------------------//
export default function ButtonAddIvent({ handler, goTodayHandler }) {
  return (
    <>
      <button type="button" className={styles.btn} onClick={handler}>
        +
      </button>
      <button type="button" className={styles.gotoday} onClick={goTodayHandler}>
        Today
      </button>
    </>
  );
}
