import {  useOutlet } from "react-router-dom";
import NotesList from "./NotesList";
import SingleNote from "./SingleNote";

export default function NotesArea() {
  const outlet = useOutlet();
  return (
    <>
      <NotesList />
      {outlet || <SingleNote />}
    </>
  );
}
