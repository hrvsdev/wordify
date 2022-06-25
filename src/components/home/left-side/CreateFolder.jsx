import { useState, useRef } from "react";
import axios from "axios";

import folderIcon from "../../../assets/home/folder.svg";
import addFolderIcon from "../../../assets/home/add-folder.svg";
import plusIcon from "../../../assets/home/plus.svg";

export default function CreateFolder() {
  // New folder input state
  const [folderName, setFolderName] = useState("");

  // Refs
  const addFolderRef = useRef();
  const addFolderInputRef = useRef();

  // Showing input box for folder
  const addFolderFunc = () => {
    addFolderRef.current.classList.add("show");
    addFolderInputRef.current.focus();
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

  return (
    <>
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
    </>
  );
}
