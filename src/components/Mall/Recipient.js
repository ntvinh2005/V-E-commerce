import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { database } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const Recipient = ({ item, owner }) => {
  const [open, setOpen] = useState(false);
  const [place, setPlace] = useState("");
  const [date, setDate] = useState(new Date());
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) navigate("/login");

  const openModal = async () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);

    //create new recipient
    await database.recipient.add({
      place: place,
      custommer: user.uid,
      seller: owner !== null ? owner[0] : "Unknown",
      item: item,
      date: date,
    });

    setOpen(false);
    setPlace("");
  };

  return (
    <>
      <button onClick={openModal} className="bton bton-outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fillRule="currentColor"
          className="bi bi-cart-plus"
          viewBox="0 0 16 16"
        >
          <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      </button>
      <Modal
        show={open}
        onHide={closeModal}
        className="text-center card-item card-shadow"
      >
        <div className="card-item-header card-item-image rounded-top">
          {item.url !== "" ? <img src={item.url} alt=""></img> : null}
        </div>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Item's Name: {item.name}</Form.Label>
              <br />
              <Form.Label>Item's Description: {item.description}</Form.Label>
              <br />
              <Form.Label>
                Seller's mail: {owner !== null ? owner[0].email : "Unknown"}
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>Place for trading:</Form.Label>
              <Form.Control
                type="text"
                required
                value={place}
                onChange={(event) => setPlace(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date for trading:</Form.Label>
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="Pp"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit">
              Add
            </Button>
            <Button variant="danger" onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Recipient;
