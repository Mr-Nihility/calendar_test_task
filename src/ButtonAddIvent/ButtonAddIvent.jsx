import React from "react";
import styles from "./ButtonAddIvent.module.css";
//--------------------------------------------------//
export default function ButtonAddIvent({ handler }) {
  return (
    <button type="button" className={styles.btn} onClick={handler}>
      +
    </button>
  );
}
