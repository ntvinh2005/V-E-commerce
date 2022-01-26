import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ItemInfo = ({ item, owner }) => {
  const [open, setOpen] = useState(false);

  const openModal = async () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <button onClick={openModal} className="bton">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fillRule="info"
          variant="info"
          className="bi bi-info-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
      </button>
      <Modal show={open} onHide={closeModal} className="text-center card-item card-shadow">
          <div className="card-item-header card-item-image rounded-top">
            {item.url !== "" ? (
              <img src={item.url} alt=""></img>
            ) : null}
          </div>
        <Form>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Item's Name: {item.name}</Form.Label>
              <br />
              <Form.Label>Item's Description: {item.description}</Form.Label>
              <br />
              <Form.Label>
                Seller: {owner !== null ? owner[0].email : "Unknown"}
              </Form.Label>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ItemInfo;
