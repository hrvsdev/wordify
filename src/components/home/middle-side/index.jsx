import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";

import plusIcon from "../../../assets/home/plus.svg";

import NoteComponent from "./NoteComponent";

export default function NotesList() {
  // Navigation hook
  const navigate = useNavigate();

  // Getting folder from parameters
  const { folder, note } = useParams();

  // Notes state
  const [notes, setNotes] = useState([]);

  // Getting notes
  const getNotes = async () => {
    let url;
    if (folder === "all") url = "http://localhost:5000/notes";
    else url = `http://localhost:5000/${folder}/note`;
    try {
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
