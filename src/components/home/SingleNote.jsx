import { useState } from "react";

import previewIcon from "../../assets/home/preview.svg";
import editIcon from "../../assets/home/edit.svg";
import saveIcon from "../../assets/home/save.svg";

import { RichTextEditor } from "@mantine/rte";
import editorConfig from "./editorConfig";

export default function SingleNote() {
  const [titleValue, setTitleValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [editorValue, setEditorValue] = useState("Start writing from here ...");
  const [previewEditor, setPreviewEditor] = useState(false);

  const handlePreview = () => {
    setPreviewEditor((prev) => !prev);
  };

  const handleSave = () => {
    setPreviewEditor(true);
    console.log(editorValue);
  };

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
        <RichTextEditor
          value={editorValue}
          controls={editorConfig}
          onChange={setEditorValue}
          readOnly={previewEditor}
        />
      </div>
    </div>
  );
}
