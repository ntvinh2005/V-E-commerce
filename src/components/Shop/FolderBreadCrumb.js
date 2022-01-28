import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../contexts/ShopContext";

const FolderBreadCrumb = ({ currentFolder }) => {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
  return (
    <Breadcrumb
      className="flex-grow-1 p-2 chat-bubble"
      listProps={{ className: "pl-0 m-0" }}
      style={{ background: 'none', width: 'fit-content'}}
    >
      {path.map((folder) => (
          <div className="d-flex" key={folder.id+Date.now()}>
          <Link
            //linkAs={Link}
            to={folder.id ? "/folder/" + folder.id : "/"}
            className="text-truncate d-inline-block text-decoration-none me-2"
            style={{ maxWidth: "200px" }}
          >
            {folder.name}
          </Link>
          <strong className="me-2">/</strong>
          </div>
      ))}

      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block text-decoration-none"
          style={{ maxWidth: "200px" }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default FolderBreadCrumb;
