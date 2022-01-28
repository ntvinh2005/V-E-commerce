import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { database, storage } from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import { ROOT_FOLDER } from "../../contexts/ShopContext";

const AddShopFolder = ({ currentFolder }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setName("");
    setDescription("");
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Deal with exception
    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    const real_path = [...currentFolder.real_path];

    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
      real_path.push(currentFolder.name);
    }

    await database.shop_item.add({
      name: name,
      description: description,
      createAt: database.getCurrentTimestamp(),
      url: "",
      folderId: currentFolder.id,
      userId: user.uid,
    });
    //reset and close
    setName("");
    setDescription("");
    closeModal();
  };

  return (
    <div>
      <Button variant="outline-secondary" onClick={openModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fillRule="currentColor"
          className="bi bi-archive-fill"
          viewBox="0 0 16 16"
        >
          <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
        </svg>
      </Button>
      <Modal show={open} onHide={closeModal} className="text-center">
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Item's Name:</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Item's description:</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
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
    </div>
  );
};

export default AddShopFolder;
