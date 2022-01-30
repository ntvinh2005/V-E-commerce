import React, { useState } from "react";
import { Card, InputGroup, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useMessage } from "../../../contexts/MessageContext";
import Message from "./Message";

const MailBox = () => {
  let { user } = useAuth();

  const [open, setOpen] = useState(false);
  const [{ recentMail }, getMessages, getNewMessages] = useMessage("");

  return (
    <div>
      {open === false ? (
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>You will receive mail (chat) here.</Tooltip>}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fillRule="currentColor"
            className="bi bi-mailbox ms-4 fixed-bottom mb-5"
            style={{ cursor: "pointer" }}
            viewBox="0 0 16 16"
            onClick={() => {
              setOpen(true);
              getNewMessages();
            }}
          >
            <path d="M4 4a3 3 0 0 0-3 3v6h6V7a3 3 0 0 0-3-3zm0-1h8a4 4 0 0 1 4 4v6a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V7a4 4 0 0 1 4-4zm2.646 1A3.99 3.99 0 0 1 8 7v6h7V7a3 3 0 0 0-3-3H6.646z" />
            <path d="M11.793 8.5H9v-1h5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.354-.146l-.853-.854zM5 7c0 .552-.448 0-1 0s-1 .552-1 0a1 1 0 0 1 2 0z" />
          </svg>
        </OverlayTrigger>
      ) : (
        <Card
          className="fixed-bottom ms-3 mb-3"
          style={{ maxWidth: "250px", height: "300px" }}
        >
          <Card.Header>
            <InputGroup className="align-items-center">
              Mail Box
              <button
                type="button"
                className="btn-close ms-auto"
                aria-label="Close"
                onClick={() => setOpen(false)}
              ></button>
            </InputGroup>
          </Card.Header>
          <Card.Body className="overflow-auto">
            <Message
              message={
                "You can find detail conversation by click chat icon below and change the 'TO' address"
              }
              owner={"Robot"}
              color="#A0D0BD"
            />
            {recentMail.map((message) => (
              <div
                key={String(Math.random() * 1000000000) + String(Date.now())}
              >
                {message.createdAt === undefined
                  ? null
                  : String(message.createdAt.toDate()).split("G")[0]}
                <Message
                  message={message.message}
                  owner={message.speakers.speaker}
                  color="#CAFBE8"
                />
              </div>
            ))}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default MailBox;
