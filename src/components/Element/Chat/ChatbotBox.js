import React, { useState } from "react";
import { Card, Button, InputGroup, Form } from "react-bootstrap";
import { robotThinking } from "./Chatbot";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

const Chatbox = () => {
  let { user } = useAuth();

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    var fmessages = messages;
    fmessages.push(message);
    setMessages(fmessages);
    let response = robotThinking(message, user, navigate);
    fmessages.push(response);
    setMessages(fmessages);
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
          className="bi bi-chat-dots-fill fixed-bottom ms-auto me-3 mb-3"
          style={{ cursor: "pointer" }}
          viewBox="0 0 16 16"
          onClick={() => setOpen(true)}
        >
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
        </svg>
      ) : (
        <Card
          className="fixed-bottom ms-auto me-3 mb-3"
          style={{ maxWidth: "250px", height: "300px" }}
        >
          <Card.Header>
            Messaging with Bots {"   "}
            <button
              type="button"
              className="btn-close ms-4 me-0"
              aria-label="Close"
              onClick={() => setOpen(false)}
            ></button>
          </Card.Header>
          <Card.Body className="overflow-auto">
            {messages.map((message, index) => (
              <div
                key={String(Math.random() * 1000000000) + String(Date.now())}
              >
                {index % 2 !== 0 ? (
                  <Message message={message} owner={"Robot"} color="#CAFBE8" />
                ) : (
                  <Message
                    message={message}
                    owner={user.email}
                    color="#A0D0BD"
                  />
                )}
              </div>
            ))}
          </Card.Body>
          <Card.Footer>
            <InputGroup>
              <Form.Control
                type="textarea"
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
