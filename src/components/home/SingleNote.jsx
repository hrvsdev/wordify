import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs"

export default function SingleNote() {

  new EditorJS({holder: "editor"})

  return (
    <div className="right-side">
      <div className="upper-sec">
        <div className="title-wrapper">
          <input type="text" placeholder="Enter note title" />
        </div>
      </div>
      <div className="note-info">
        <div className="category-wrapper">
          <p className="info-title">Category</p>
          <p className="info">General</p>
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
        <div id="editor"></div>
      </div>
    </div>
  );
}
