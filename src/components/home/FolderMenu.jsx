import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import searchIcon from "../../assets/home/search.svg";
import folderIcon from "../../assets/home/folder.svg";
import addFolderIcon from "../../assets/home/add-folder.svg";
import checkIcon from "../../assets/home/check.svg";
import plusIcon from "../../assets/home/plus.svg";
import binIcon from "../../assets/home/bin.svg";
import logoutIcon from "../../assets/home/logout.svg";

function SideButton({ to, title }) {
  return (
    <NavLink to={to} className="side-button">
      <img src={folderIcon} />
      <p>{title}</p>
    </NavLink>
  );
}

export default function FolderMenu() {
  const navigate = useNavigate();

  const addFolderRef = useRef();
  const addFolderInputRef = useRef();
  const logoutCheckRef = useRef();
  const logoutBoxRef = useRef();

  const [folders, setFolders] = useState([
    { to: "study", title: "Study notes" },
    { to: "personal", title: "Personal notes" },
  ]);

  const addFolderFunc = () => {
    addFolderRef.current.classList.add("show");
    addFolderInputRef.current.focus();
  };

  const addFolderCheckFunc = () => {
    const folderName = addFolderInputRef.current.value;
    if (folderName) {
      setFolders((prev) => [...prev, { to: folderName, title: folderName }]);
      navigate(folderName);
    }
    addFolderRef.current.classList.remove("show");
    addFolderInputRef.current.value = "";
  };

  const logoutBoxClick = (e) => {
    logoutBoxRef.current.classList.toggle("active-logout");
  };

  const logoutCheckClick = () => {
    navigate("/login");
    logoutBoxRef.current.classList.remove("active-logout");
  };

  return (
    <div className="left-side">
      <div className="upper-sec">
        <div className="user-info-wrapper">
          <img src="https://i.ibb.co/y5PFwdN/Common-removebg-preview.png" />
          <p className="user-name">User Name</p>
        </div>
        <div className="search-wrapper">
          <img src={searchIcon} />
          <input type="text" placeholder="Search notes" />
        </div>
      </div>
      <div className="middle-sec">
        <SideButton to="/" title="All notes" />
        {folders.map((e) => (
          <SideButton {...e} key={e.to} />
        ))}
        <div ref={addFolderRef} className="add-folder-input">
          <img className="folder-icon" src={folderIcon} />
          <input
            ref={addFolderInputRef}
            type="text"
            maxLength="14"
            placeholder="Folder name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addFolderCheckFunc();
              }
            }}
          />
          <img
            className="plus-icon"
            src={plusIcon}
            onClick={addFolderCheckFunc}
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
