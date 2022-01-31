import React from "react";
import AddShopFolder from "./AddShopFolder";
import AddShopItem from "./AddShopItem";
import { useParams } from "react-router-dom";
import { useFolder } from "../../contexts/ShopContext";
import Folder from "./Folder";
import ShopItem from "./ShopItem";
import FolderBreadCrumb from "./FolderBreadCrumb";

const Shop = () => {
  const { folderId } = useParams();
  const { folder, childFolders, childItems } = useFolder(folderId);

  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <h3 className="m-3 flex-grow-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fillRule="currentColor"
            className="bi bi-shop me-3"
            viewBox="0 0 16 16"
          >
            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
          </svg>
          Your shop
        </h3>
        <div className="d-flex align-items-center me-3">
          <AddShopFolder currentFolder={folder} className="me-3" />
          <AddShopItem currentFolder={folder} className="me-3" />
        </div>
      </div>
      <FolderBreadCrumb currentFolder={folder} />
      {childFolders.length > 0 && (
        <div className="d-flex flex-wrap">
          {childFolders.map((childfolder) => (
            <div
              key={childfolder.id}
              style={{ maxWidth: "250px" }}
              className="p-2"
            >
              <Folder folder={childfolder}></Folder>
            </div>
          ))}
        </div>
      )}

      {childItems.length > 0 && (
        <div className="d-flex flex-wrap">
          {childItems.map((childitem) => (
            <div key={childitem.id} className="p-2">
              <ShopItem
                item={childitem}
                currentFolder={folder}
                style={{
                  maxWidth: "fit-content!important",
                  maxHeight: "fit-content!important",
                }}
              ></ShopItem>
            </div>
          ))}
        </div>
      )}

      {childItems.length === 0 && childFolders.length === 0 && (
        <p className="ms-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fillRule="currentColor"
            className="bi bi-bookmark-star me-5"
            viewBox="0 0 16 16"
          >
            <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
          </svg>
          You haven't created any folder or item in this folder yet. Create one
          by clicking two buttons above.
        </p>
      )}
    </div>
  );
};

export default Shop;
