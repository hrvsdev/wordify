import { useContext, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import { Context } from "../../../context/Context";
import FolderMenu from "../left-side";


export default function Home() {
  // Param
  const { folder, note } = useParams();

  // Navigation hook
  const navigate = useNavigate();

  // Context
  const { getUser } = useContext(Context);

  // Getting User Details
  useEffect(() => {
    if (!folder) navigate("/all");
    getUser();
  }, []);

  return (
    <main className="home-container">
        <FolderMenu />
        <Outlet />
    </main>
  );
}
