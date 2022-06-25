import { NavLink } from "react-router-dom";

import {
  convertDateToString,
  extractTextFromHTML,
} from "../../../helper/note.helper";

export default function NoteComponent({ notes }) {
  return notes.map((e) => (
    <NavLink to={e._id} key={e._id} className="note-wrapper">
      <p className="title">{e.title}</p>
      <p className="description">{extractTextFromHTML(e.content)}</p>
      <div className="note-bottom-wrapper">
        <p className="time">{convertDateToString(e.time)}</p>
        <p className="divider">|</p>
        <p className="category">{e.category}</p>
      </div>
    </NavLink>
  ));
}
