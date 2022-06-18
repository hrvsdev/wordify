import { useContext, useEffect } from "react";
import { useOutlet, useNavigate } from "react-router-dom";

import FolderMenu from "./FolderMenu";
import NotesArea from "./NotesArea";

import { Context } from "../../context/Context";

import "./Home.scss";

export default function Home() {
  // Outlet hook
  const outlet = useOutlet();

  // Navigation hook
  const navigate = useNavigate();

  // Context
  const { user, getUser } = useContext(Context);

  // Getting User Details
  useEffect(() => {
    getUser();
  }, []);

  return (
    <main className="home-container">
      <FolderMenu />
      {outlet || <NotesArea />}
    </main>
  );
}
