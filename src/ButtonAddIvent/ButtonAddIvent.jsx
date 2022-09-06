import React from 'react';
import styles from './ButtonAddIvent.module.css';

import svg from '../assets/icons.svg';
//--------------------------------------------------//
export default function ButtonAddIvent({ handler, goTodayHandler }) {
  return (
    <>
      <button type="button" className={styles.btn} onClick={handler}>
        <svg className={styles.icon} width="15" height="15">
          <use href={`${svg}#icon-add`}></use>
        </svg>
      </button>
      <button type="button" className={styles.gotoday} onClick={goTodayHandler}>
        Today
      </button>
    </>
  );
}
