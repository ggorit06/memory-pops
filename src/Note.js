import React, { useState } from "react";

const Note = (props) => {
  const [dateTime, setDateTime] = useState(props.note.datetime);

  const updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "title", updatedValue);
  };

  const updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = props.note.id;
    props.onType(editMeId, "description", updatedValue);
  };

  const clickDelete = () => props.removeNote(props.note.id);

  const addDateTime = () => {
    const now = new Date();
    const dateTime = now.toLocaleString();
    setDateTime(dateTime);
    const editMeId = props.note.id;
    props.onType(editMeId, "description");
  };

  return (
    <li className="note">
      <input
        type="text"
        value={props.note.title}
        onChange={updateTitle}
        placeholder="Title"
        className="note__title"
      />
      <textarea
        value={props.note.description}
        onChange={updateDescription}
        placeholder="Description..."
        className="note__description"
      />
      <div id="sticky-note">
        <textarea></textarea>
        <button onClick={addDateTime}>Add Date and Time</button>
        <span className="note__datetime">{dateTime}</span>
      </div>
      <span onClick={clickDelete} className="note__delete">
        X
      </span>
    </li>
  );
};

export default Note;
