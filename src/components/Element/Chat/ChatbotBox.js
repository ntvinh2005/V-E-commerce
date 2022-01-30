import React, { useState } from "react";
import { Card, Button, InputGroup, Form, OverlayTrigger, Tooltip} from "react-bootstrap";
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
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Hi {user.email}. Click here to chat with me</Tooltip>}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fillRule="currentColor"
            className="bi bi-robot fixed-bottom ms-auto me-3 mb-3"
            style={{ cursor: "pointer" }}
            viewBox="0 0 16 16"
            onClick={() => setOpen(true)}
          >
            <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5ZM3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.58 26.58 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.933.933 0 0 1-.765.935c-.845.147-2.34.346-4.235.346-1.895 0-3.39-.2-4.235-.346A.933.933 0 0 1 3 9.219V8.062Zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a24.767 24.767 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25.286 25.286 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135Z" />
            <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2V1.866ZM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5Z" />
          </svg>
        </OverlayTrigger>
      ) : (
        <Card
          className="fixed-bottom ms-auto me-3 mb-3"
          style={{ maxWidth: "250px", height: "300px" }}
        >
          <Card.Header className="align-items-center">
            <InputGroup>
              Messaging with Bots
              <button
                type="button"
                className="btn-close ms-auto me-0"
                aria-label="Close"
                onClick={() => setOpen(false)}
              ></button>
            </InputGroup>
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
