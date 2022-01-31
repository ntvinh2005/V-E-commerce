import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { storage, database } from "../../firebase";
import { ROOT_FOLDER } from "../../contexts/ShopContext";

const AddFile = ({ item, currentFolder }) => {
  const { user } = useAuth();

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (currentFolder === null || file === null) return;
   
    const parentPath =
      currentFolder.real_path.length > 0
        ? currentFolder.real_path.join("/")
        : "";

    const filePath =
      currentFolder === ROOT_FOLDER
        ? parentPath + "/" + file.name
        : parentPath + "/" + currentFolder.name + "/" + file.name;

    const uploadTask = storage
      .ref("/files/" + user.uid + "/" + filePath)
      .put(file);

    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        database.shop_item.doc(item.id).update({
          url: url,
        });
      });
    });
  };
  return (
    <label className="btn btn-outline-success position-absolute top-50 start-50 translate-middle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fillRule="currentColor"
        className="bi bi-upload"
        viewBox="0 0 16 16"
      >
        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
      </svg>
      <input
        type="file"
        onChange={handleUpload}
        style={{ opacity: 0, position: "absolute" }}
      />
    </label>
  );
};

export default AddFile;
