import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";

import searchIcon from "../../../assets/home/search.svg";
import folderIcon from "../../../assets/home/folder.svg";
import addFolderIcon from "../../../assets/home/add-folder.svg";
import checkIcon from "../../../assets/home/check.svg";
import plusIcon from "../../../assets/home/plus.svg";
import binIcon from "../../../assets/home/bin.svg";
import logoutIcon from "../../../assets/home/logout.svg";

import FolderButton from "./FolderButton";
import { Context } from "../../../context/Context";

export default function FolderMenu() {
  const navigate = useNavigate();

  // Context
  const { user, folders, setFolders } = useContext(Context);

  // New folder input state
  const [folderName, setFolderName] = useState("");

  // Element refs
  const addFolderRef = useRef();
  const addFolderInputRef = useRef();
  const logoutCheckRef = useRef();
  const logoutBoxRef = useRef();

  // Showing input box for folder
  const addFolderFunc = () => {
    addFolderRef.current.classList.add("show");
    addFolderInputRef.current.focus();
  };

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

  // Creating a folder
  const createFolder = async () => {
    const url = "http://localhost:5000/folder";
    const data = { name: folderName.trim() };
    try {
      await axios.post(url, data, { withCredentials: true });
      getFolders();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Handling creating a folder
  const handleCreateFolder = () => {
    if (folderName.trim()) {
      createFolder();
    }
    addFolderRef.current.classList.remove("show");
    addFolderInputRef.current.value = "";
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
        {folders.map((e) => (
          <FolderButton {...e} key={e._id} />
        ))}
        <div ref={addFolderRef} className="add-folder-input">
          <img className="folder-icon" src={folderIcon} />
          <input
            ref={addFolderInputRef}
            type="text"
            maxLength="14"
            placeholder="Folder name"
            onKeyDown={(e) => e.key === "Enter" && handleCreateFolder()}
            onChange={(e) => setFolderName(e.target.value)}
          />
          <img
            className="plus-icon"
            src={plusIcon}
            onClick={handleCreateFolder}
          />
        </div>
        <div className="add-folder" onClick={addFolderFunc}>
          <img src={addFolderIcon} />
          <p>Add new folder</p>
        </div>
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
