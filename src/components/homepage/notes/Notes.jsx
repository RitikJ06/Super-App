import React from 'react';
import styles from './notes.module.css';
import pencilImg from './images/pencil.svg';

export default function Notes() {

  const saveNotes = (notes) => {
    console.log(JSON.stringify(notes));

    localStorage.setItem("notes", JSON.stringify(notes));
  }


  return (
    <div className={styles.notesWrapper}>
        <h1 className={styles.notesHeading}>All Notes</h1>
        <textarea defaultValue={JSON.parse(localStorage.getItem("notes"))} onChange={(e) => saveNotes(e.currentTarget.value)} className={styles.notesTextArea}/>
        <div className={styles.notesIcon}>
            <img src={pencilImg}/>
        </div>
    </div>

  )
}
