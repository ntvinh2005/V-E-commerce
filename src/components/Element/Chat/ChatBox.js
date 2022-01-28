import React, { useState } from "react";
import { Card, Button, InputGroup, Form } from "react-bootstrap";
import { useAuth } from "../../../contexts/AuthContext";
import { useMessage } from "../../../contexts/MessageContext";
import { database } from "../../../firebase";
import Message from "./Message";

const Chatbox = () => {
  let { user } = useAuth();

  if (!user)
    user = {
      id: "bcjncknjk",
      email: "guest@mail.com",
      password: "You don't need it",
    };

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("guest@mail.com");
  const [{ messages }, getMessages] = useMessage(address);

  const sendMessage = async () => {
    database.messages
      .add({
        speakers: [user.email, address],
        message: message,
        createdAt: database.getCurrentTimestamp(),
      })
      .then(() => getMessages());
    setMessage("");
  };

  return (
    <div>
      {open === false ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fillRule="currentColor"
          className="bi bi-chat-left-dots ms-3 fixed-bottom mb-3"
          style={{cursor: "pointer"}}
          viewBox="0 0 16 16"
          onClick={() => setOpen(true)}
        >
          <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
          <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      ) : (
        <Card
          className="fixed-bottom ms-3 mb-3"
          style={{ maxWidth: "250px", height: "300px" }}
        >
          <Card.Header>
            <InputGroup className="align-items-center">
              <Button onClick={getMessages.bind(this)}>To</Button>
              <Form.Control
                type="textarea"
                placeholder=""
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              <button
                type="button"
                className="btn-close ms-4 me-0"
                aria-label="Close"
                onClick={() => setOpen(false)}
              ></button>
            </InputGroup>
          </Card.Header>
          <Card.Body className="overflow-auto">
            {messages.map((message) => (
              <div
                key={String(Math.random() * 1000000000) + String(Date.now())}
              >
                {message.speakers[0]===user.email ? (
                  <Message
                    message={message.message}
                    owner={message.speakers[0]}
                    color="#CAFBE8"
                  />
                ) : (
                  <Message
                    message={message.message}
                    owner={message.speakers[0]}
                    color="#A0D0BD"
                  />
                )}
              </div>
            ))}
          </Card.Body>
          <Card.Footer>
            <InputGroup>
              <textarea
                type="form-control"
                style={{ height: "40px" }}
                placeholder="Message to"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <Button onClick={sendMessage.bind(this)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fillRule="currentColor"
                  className="bi bi-send"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
              </Button>
            </InputGroup>
          </Card.Footer>
        </Card>
      )}
    </div>
  );
};

export default Chatbox;
