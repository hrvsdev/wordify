import { NavLink } from "react-router-dom";

import {
  convertDateToString,
  extractTextFromHTML,
} from "../../../helper/note.helper";

export default function NoteComponent({ to, title, category, content, time }) {
  return (
    <NavLink to={to} className="note-wrapper">
      <p className="title">{title}</p>
      <p className="description">{extractTextFromHTML(content)}</p>
      <div className="note-bottom-wrapper">
        <p className="time">{convertDateToString(time)}</p>
        <p className="divider">|</p>
        <p className="category">{category}</p>
      </div>
    </NavLink>
  );
}