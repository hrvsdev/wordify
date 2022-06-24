import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import plusIcon from "../../../assets/home/plus.svg";
import {
  convertDateToString,
  extractTextFromHTML,
  limitString,
} from "../../../helper/note.helper";

function NoteComponent({ to, title, category, content, time }) {
  return (
    <NavLink to={to} className="note-wrapper">
      <p className="title">{title}</p>
      <p className="description">{limitString(extractTextFromHTML(content))}</p>
      <div className="note-bottom-wrapper">
        <p className="time">{convertDateToString(time)}</p>
        <p className="divider">|</p>
        <p className="category">{category}</p>
      </div>
    </NavLink>
  );
}

export default function NotesList() {
  // Navigation hook
  const navigate = useNavigate();

  // Getting folder from parameters
  const { folder, note } = useParams();

  // Notes state
  const [notes, setNotes] = useState([]);

  // Getting notes
  const getNotes = async () => {
    try {
      const url =
        folder === "all"
          ? "http://localhost:5000/notes"
          : `http://localhost:5000/${folder}/note`;

      const res = await axios.get(url, { withCredentials: true });
      return setNotes(res.data.obj);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Running function on first load
  useEffect(() => {
    if (!note) navigate("add");
    getNotes();
  }, [folder]);

  return (
    <div className="middle-side">
      <div className="folder-name">
        <p>Personal notes</p>
      </div>
      <NavLink to="add" className="add-note">
        <img src={plusIcon} />
        <p>Add a new note</p>
      </NavLink>
      <div className="notes-list-wrapper">
        {notes.map((e) => (
          <NoteComponent key={e._id} to={e._id} {...e} />
        ))}
      </div>
    </div>
  );
}
