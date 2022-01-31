import React, { useState, useEffect } from "react";
import AddFile from "./AddFile";
import ItemInfo from "../Element/ItemInfo";
import Recipient from "../Mall/Recipient";
import DeleteButton from "./DeleteButton";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";

const ShopItem = ({ item, currentFolder }) => {
  let { user } = useAuth();

  const [owner, setOwner] = useState(null);

  const [like, setLike] = useState(false);

  useEffect(() => {
    searchForItem();
  }, []);

  const searchForItem = async () => {
    if (item.fans === undefined) item.fans = [];
    if (item.fans.includes(user.email)) setLike(true);
  };

  const likeItem = async () => {
    console.log("liked");
    var ffans = item.fans;
    if (ffans === undefined) ffans = [];
    if (like === false) {
      ffans.push(user.email);
      console.log(ffans);
    } else {
      ffans = ffans.filter(function (value) {
        return value !== user.email;
      });
    }
    database.shop_item.doc(item.id).update({ fans: ffans });
    like === false ? setLike(true) : setLike(false);
  };

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
          <strong className="me-2">{item.fans === undefined ? 0 : item.fans.length}</strong>
          {like === false ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              className="bi bi-heart heartbeat" 
              onClick={() => {
                likeItem();
                console.log("ssjcnj");
              }}
              viewBox="0 0 16 16"
            >
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="red"
              className={"bi bi-heart-fill heartbeat"}
              onClick={() => {
                likeItem();
                console.log("ssjcnj");
              }}
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          )}
        </div>
        <div className="card-item-footer">
          <ItemInfo item={item} owner={owner} />
          {owner !== null && owner[0].uid !== user.uid ? (
            <>
              <Recipient item={item} owner={owner} />
            </>
          ) : (
            <DeleteButton id={item.id} downloadUrl={item.url}></DeleteButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
