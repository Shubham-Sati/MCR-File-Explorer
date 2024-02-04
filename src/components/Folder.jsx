/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./Folder.css";
import AddFolderIcon from "../assets/add-folder.1024x904.png";
import AddFileIcon from "../assets/file-add.817x1024.png";

const Folder = ({ handleInsertNode, explorer }) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();

    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // add folder of file to explorer folder logic
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);

      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>📁 {explorer.name}</span>

          <div className="func">
            {/* <button>Folder +</button> */}
            <img
              onClick={(e) => handleNewFolder(e, true)}
              className="folderImage"
              src={AddFolderIcon}
            />
            <img
              onClick={(e) => handleNewFolder(e, false)}
              className="fileImage"
              src={AddFileIcon}
            />
            {/* <button>File +</button> */}
          </div>
        </div>
        <div style={{ display: expand ? "block" : "none", paddingLeft: 20 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                autoFocus
                type="text"
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                onKeyDown={(e) => onAddFolder(e)}
                className="inputContainer__input"
              />
            </div>
          )}

          {explorer.items.map((exp) => {
            return (
              // <span key={exp.id}>{exp.name}</span>
              <Folder
                handleInsertNode={handleInsertNode}
                key={exp.id}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return <span className="file">📄 {explorer.name}</span>;
  }
};

export default Folder;
