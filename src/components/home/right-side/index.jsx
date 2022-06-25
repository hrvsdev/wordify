import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import previewIcon from "../../../assets/home/preview.svg";
import saveIcon from "../../../assets/home/save.svg";

import { Title, Category } from "./Inputs";

export default function SingleNote() {
  // Parameters
  const { folder, note } = useParams();

  // Input states
  const [titleValue, setTitleValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [editorValue, setEditorValue] = useState("");

  // Editor preview state
  const [previewEditor, setPreviewEditor] = useState(false);

  // Preview button handler
  const handlePreview = () => {
    setPreviewEditor((prev) => !prev);
  };

  // Creating a note
  const createNote = async () => {
    let url;
    if (folder === "all") url = "http://localhost:5000/note";
    else url = `http://localhost:5000/${folder}/note`;
    try {
      const data = {
        title: titleValue,
        category: categoryValue,
        content: editorValue,
      };
      await axios.post(url, data, { withCredentials: true });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Getting a note
  const getNote = async () => {
    const url = `http://localhost:5000/note/${note}`;
    try {
      const res = await axios.get(url, { withCredentials: true });
      const note = res.data.obj;
      setTitleValue(note.title);
      setCategoryValue(note.category);
      setEditorValue(note.content);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Save button handler
  const handleSave = () => {
    setPreviewEditor(true);
    createNote();
  };

  // Running functions on first load
  useEffect(() => {
    if (!(note === "add")) getNote();
  }, [note]);

  // Inputs Component Props
  const inputProps = {
    title: {
      previewEditor,
      titleValue,
      setTitleValue,
    },
    category: {
      previewEditor,
      categoryValue,
      setCategoryValue,
    },
  };

  return (
    <div className="right-side">
      <div className="upper-sec">
        <div className="title-wrapper">
          <Title {...inputProps.title} />
        </div>
        <div className="button-menu-wrapper">
          <div className="button-wrapper" onClick={handlePreview}>
            <img className="preview" src={previewIcon} />
          </div>
          <div className="button-wrapper" title="Save" onClick={handleSave}>
            <img className="save" src={saveIcon} />
          </div>
        </div>
      </div>
      <div className="note-info">
        <div className="category-wrapper">
          <p className="info-title">Category</p>
          <div className="info">
            <Category {...inputProps.category} />
          </div>
        </div>
        <div className="created-wrapper">
          <p className="info-title">Created at</p>
          <p className="info">28 Aug 2022, 09:16 AM</p>
        </div>
        <div className="modified-wrapper">
          <p className="info-title">Modified at</p>
          <p className="info">28 Aug 2022, 02:56 PM</p>
        </div>
      </div>
      <hr />
      <div className="editor-wrapper"></div>
    </div>
  );
}
