import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import previewIcon from "../../../assets/home/preview.svg";
import saveIcon from "../../../assets/home/save.svg";

import { createReactEditorJS } from "react-editor-js";

export default function SingleNote() {
  // Parameters
  const { folder, note } = useParams();

  // Create a new instance
  const ReactEditorJS = createReactEditorJS();

  // Input states
  const [titleValue, setTitleValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [editorValue, setEditorValue] = useState("Start writing from here ...");

  // Editor preview state
  const [previewEditor, setPreviewEditor] = useState(false);

  // Preview button handler
  const handlePreview = () => {
    setPreviewEditor((prev) => !prev);
  };

  // Creating a note
  const createNote = async () => {
    try {
      const url =
        folder === "add"
          ? "http://localhost:5000/note"
          : `http://localhost:5000/${folder}/note`;

      const data = {
        title: titleValue,
        category: categoryValue,
        content: editorValue,
      };
      const res = await axios.post(url, data, { withCredentials: true });
      console.log(res.data);
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
    console.log("Single Note");
    getNote();
  }, [note]);

  return (
    <div className="right-side">
      <div className="upper-sec">
        <div className="title-wrapper">
          {previewEditor ? (
            titleValue.trim() ? (
              <div className="title">{titleValue}</div>
            ) : (
              <div className="untitle">Untitled note</div>
            )
          ) : (
            <input
              type="text"
              placeholder="Enter note title"
              value={titleValue}
              onChange={(e) => {
                setTitleValue(e.target.value);
              }}
            />
          )}
        </div>
        <div className="button-menu-wrapper">
          <div
            className="button-wrapper"
            title="Preview"
            onClick={handlePreview}
          >
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
          <p className="info">
            {previewEditor ? (
              categoryValue.trim() ? (
                <div className="category">{categoryValue}</div>
              ) : (
                <div className="uncategorized">Uncategorized</div>
              )
            ) : (
              <input
                type="text"
                placeholder="Enter category here"
                value={categoryValue}
                onChange={(e) => {
                  setCategoryValue(e.target.value);
                }}
              />
            )}
          </p>
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
      <div className="editor-wrapper">
        <ReactEditorJS placeholder="Enter Text here"/>
        {/* <RichTextEditor
          value={editorValue}
          controls={editorConfig}
          onChange={setEditorValue}
          readOnly={previewEditor}
        /> */}
      </div>
    </div>
  );
}
