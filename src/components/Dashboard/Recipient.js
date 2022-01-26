import React, {useEffect, useState} from "react";
import { database } from "../../firebase"

const Recipient = ({recipient}) => {
  const [owner, setOwner] = useState(null);

  const getUser = () => {
    database.profile.where("uid", "==", recipient.item.userId).onSnapshot((snapshot) => {
      setOwner(snapshot.docs.map(database.formatDoc));
      console.log(snapshot.docs.map(database.formatDoc))
    });
  };

  useEffect(() => {
      getUser();
  }, []);
  
  return (
      <div className="text-center">
        <div className="card-item card-shadow">
          <div className="card-item-header card-item-image">
            <img src={recipient.item.url} alt=""></img>
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
            {recipient.item.name}
            <p>Description: {recipient.item.description}</p>
            <p>Custommer's email: {owner!==null ? owner[0].email : "Unknown"}</p>
            <p>Date for trading: {recipient.date == undefined ? null : String(recipient.date.toDate())}</p>
            <p>Place for trading: {recipient.place}</p>
          </div>
          <div className="card-item-footer"></div>
        </div>
      </div>
  );
};

export default Recipient;
