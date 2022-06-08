import { Outlet, useOutlet } from "react-router-dom";

import FolderMenu from "./FolderMenu";
import NotesList from "./NotesList";
import NotesArea from "./NotesArea";

import "./Home.scss";

export default function Home() {
  const outlet = useOutlet();
  return (
    <main className="home-container">
      <FolderMenu />
      {outlet || <NotesArea/>}
    </main>
  );
}
