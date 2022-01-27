import React, { useState, useEffect } from "react";
import AddFile from "./AddFile";
import ItemInfo from "../Element/ItemInfo";
import Recipient from "../Mall/Recipient";
import DeleteButton from "./DeleteButton";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const ShopItem = ({ item, currentFolder }) => {
  let { user } = useAuth();
  if (user === null) user = {id: 'nckscckcks', email: "Unknown"}
  const [owner, setOwner] = useState(null);

  const getUser = () => {
    database.profile.where("uid", "==", item.userId).onSnapshot((snapshot) => {
      setOwner(snapshot.docs.map(database.formatDoc));
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="text-center">
      <div className="card-item card-shadow">
        <div className="card-item-header card-item-image">
          {item.url !== "" ? (
            <img src={item.url} alt=""></img>
          ) : (
            <AddFile item={item} currentFolder={currentFolder} />
          )}
        </div>
        <div className="card-item-body">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fillRule="currentColor"
            className="bi bi-archive me-2"
            viewBox="0 0 16 16"
          >
            <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
          </svg>
          {item.name}
          <p>{item.description}</p>
        </div>
        <div className="card-item-footer">
          <ItemInfo item={item} owner={owner} />
          {owner !== null && owner[0].uid !== user.uid ? (
            <Recipient item={item} owner={owner} />
          ) : (
            <DeleteButton id={item.id} downloadUrl={item.url}></DeleteButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
