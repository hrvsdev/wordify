import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";

import searchIcon from "../../../assets/home/search.svg";
import checkIcon from "../../../assets/home/check.svg";
import binIcon from "../../../assets/home/bin.svg";
import logoutIcon from "../../../assets/home/logout.svg";

import { FolderButton, Folders } from "./Folders";
import { Context } from "../../../context/Context";
import CreateFolder from "./CreateFolder";

export default function FolderMenu() {
  const navigate = useNavigate();

  // Context
  const { user, folders, setFolders } = useContext(Context);

  // Element refs
  const logoutCheckRef = useRef();
  const logoutBoxRef = useRef();

  // Getting folders
  const getFolders = async () => {
    const url = "http://localhost:5000/folders";
    try {
      const res = await axios.get(url, { withCredentials: true });
      setFolders(res.data.obj);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Highlight Logout Button
  const logoutBoxClick = (e) => {
    logoutBoxRef.current.classList.toggle("active-logout");
  };

  // Logging out User
  const logoutCheckClick = async () => {
    const url = "http://localhost:5000/logout";
    try {
      axios.get(url, { withCredentials: true });
      logoutBoxRef.current.classList.remove("active-logout");
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // Running functions on first load
  useEffect(() => {
    getFolders();
  }, []);

  return (
    <div className="left-side">
      <div className="upper-sec">
        <div className="user-info-wrapper">
          <img src={user?.picture} />
          <p className="user-name">{user?.name}</p>
        </div>
        <div className="search-wrapper">
          <img src={searchIcon} />
          <input type="text" placeholder="Search notes" />
        </div>
      </div>
      <div className="middle-sec">
        <FolderButton _id="/all" name="All notes" />
        <Folders folders={folders} />
        <CreateFolder/>
      </div>
      <div className="bottom-sec">
        <NavLink to="bin" className="bin">
          <img src={binIcon} />
          <p>Deleted notes</p>
        </NavLink>
        <div ref={logoutBoxRef} className="logout" onClick={logoutBoxClick}>
          <img className="logout-icon" src={logoutIcon} />
          <p>Log out</p>
          <img
            ref={logoutCheckRef}
            className="check-icon"
            src={checkIcon}
            title="Log out"
            onClick={logoutCheckClick}
          />
        </div>
      </div>
    </div>
  );
}
