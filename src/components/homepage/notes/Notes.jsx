import React from "react";
import styles from "./notes.module.css";
import pencilImg from "./images/pencil.svg";

export default function Notes() {

  function debounce(func, delay) {
    let timeoutId;
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, arguments);
      }, delay);
    };
  }
  const saveNotes = (notes) => {
    localStorage.setItem("notes", JSON.stringify(notes));
  };
  let betterSaveNotes = debounce(saveNotes, 1500);

  return (
    <div className={styles.notesWrapper}>
      <h1 className={styles.notesHeading}>All Notes</h1>
      <textarea
        defaultValue={JSON.parse(localStorage.getItem("notes"))}
        onChange={(e) => betterSaveNotes(e.currentTarget.value)}
        className={styles.notesTextArea}
      />
      <div className={styles.notesIcon}>
        <img src={pencilImg} />
      </div>
    </div>
  );
}
