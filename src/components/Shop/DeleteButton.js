import React from "react";
import { database, storage } from "../../firebase";
import { Button } from "react-bootstrap";

const DeleteButton = ({ id, downloadUrl }) => {
  console.log(downloadUrl);
  function removeFile(id, downloadUrl) {
    console.log(downloadUrl);
    const storageRefa = storage.refFromURL(downloadUrl);

    storageRefa
      .delete()
      .then(() => {
        database.shop_item
          .doc(id)
          .delete()
          .then((response) => {
            console.log("delete response", response);
          })
          .catch((error) => {
            console.log("delete error", error);
          });
        var recipient_query = database.recipient.where("item.id", "==", id);
        recipient_query.get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            doc.ref.delete();
          });
        });
      })
      .catch((error) => {
        console.log("delete error", error);
      });
  }
  return (
    <>
      <button
        onClick={() => {
          removeFile(id, downloadUrl);
        }}
        className="bton bton-outline"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>
    </>
  );
};

export default DeleteButton;
