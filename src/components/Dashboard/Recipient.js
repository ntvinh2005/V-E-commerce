import React, { useEffect, useState } from "react";
import { database } from "../../firebase";

const Recipient = ({ recipient }) => {
  const [owner, setOwner] = useState(null);

  const getUser = () => {
    database.profile
      .where("uid", "==", recipient.item.userId)
      .onSnapshot((snapshot) => {
        setOwner(snapshot.docs.map(database.formatDoc));
        console.log(snapshot.docs.map(database.formatDoc));
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
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-envelope me-2"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
            </svg>
            Custommer's email: {owner !== null ? owner[0].email : "Unknown"}
          </p>
          <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fillRule="currentColor"
              className="bi bi-envelope me-2"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
            </svg>
            Seller's email: {recipient.seller.email}
          </p>
          <p>
            Date for trading:{" "}
            {recipient.date == undefined
              ? null
              : String(recipient.date.toDate())}
          </p>
          <p>Place for trading: {recipient.place}</p>
        </div>
        <div className="card-item-footer"></div>
      </div>
    </div>
  );
};

export default Recipient;
