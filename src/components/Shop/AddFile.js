import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { storage } from "../../firebase";
import { ROOT_FOLDER } from "../../contexts/ShopContext";

const AddFile = ({ currentFolder }) => {
  const { user } = useAuth();

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (currentFolder === null || file === null) return;

    const parentPath =
      currentFolder.real_path.length > 0 ? currentFolder.real_path.join("/") : "";

    const filePath =
      currentFolder === ROOT_FOLDER
        ? parentPath + "/" + file.name
        : parentPath + "/" + currentFolder.name + "/" + file.name;

    storage.ref("/files/" + user.uid + "/" + filePath).put(file);
  };
  return (
    <label className="btn btn-outline-success m-0 mr-2 ms-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-file-earmark-arrow-up"
        viewBox="0 0 16 16"
      >
        <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z" />
        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
      </svg>
      <input
        type="file"
        onChange={handleUpload}
        style={{ opacity: 0, position: "absolute"}}
      />
    </label>
  );
};

export default AddFile;
