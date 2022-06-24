import {  Outlet } from "react-router-dom";
import NotesList from "../middle-side";

export default function NotesArea() {
  return (
    <>
      <NotesList />
      <Outlet/>
    </>
  );
}
