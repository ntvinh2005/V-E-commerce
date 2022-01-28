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
        <h3 className="m-3">Your shop</h3>
        <div className="d-flex align-items-center me-3">
          <AddShopFolder currentFolder={folder} className="me-3" />
          <AddShopItem currentFolder={folder} className="me-3" />
        </div>
      </div>
      <FolderBreadCrumb currentFolder={folder}/>
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
            <div
              key={childitem.id}
              style={{ maxWidth: "250px" }}
              className="p-2"
            >
                <ShopItem item={childitem} currentFolder={folder}></ShopItem>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
