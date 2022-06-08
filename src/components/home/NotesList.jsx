import { useParams, NavLink } from "react-router-dom";

import plusIcon from "../../assets/home/plus.svg";

function NoteComponent() {
  return (
    <NavLink to="first" className="note-wrapper">
      <p className="title">Note Title</p>
      <p className="description">
        Note-taking is an important skill for students, especially at the
        college level
      </p>
      <div className="note-bottom-wrapper">
        <p className="time">28 Aug</p>
        <p className="divider">|</p>
        <p className="category">General</p>
      </div>
    </NavLink>
  );
}

export default function NotesList() {
  const { folder } = useParams();
  return (
    <div className="middle-side">
      <div className="folder-name">
        <p>Personal notes</p>
      </div>
      <div className="add-note">
        <img src={plusIcon} />
        <p>Add a new note</p>
      </div>
      <div className="notes-list-wrapper">
        <NoteComponent />
        <NoteComponent />
        <NoteComponent />
      </div>
    </div>
  );
}
