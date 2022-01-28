import React from "react";
import { useRecipient } from "../../contexts/RecipientContext";
import Recipient from "./Recipient";

const RecipientPlace = () => {
  const { recipients, cartItems } = useRecipient();
  console.log(cartItems);

  return (
    <div className="ms-3">
      {recipients.length > 0 && (
        <div className="d-flex flex-wrap align-items-center justify-content-center text-center">
          {recipients.map((child) => (
            <div key={child.id} style={{ maxWidth: "250px" }} className="p-2">
              <Recipient recipient={child}></Recipient>
            </div>
          ))}
        </div>
      )}
      {recipients.length === 0 && (
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fillRule="currentColor"
            className="bi bi-bookmark-star me-5"
            viewBox="0 0 16 16"
          >
            <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
          </svg>
          Your shop haven't been visited by customer.
        </p>
      )}
      <hr />
      <h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fillRule="currentColor"
          className="bi bi-cart-check me-3"
          viewBox="0 0 16 16"
        >
          <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
          <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
        </svg>
        Your cart
      </h2>
      {cartItems.length > 0 && (
        <div className="d-flex flex-wrap align-items-center justify-content-center text-center">
          {cartItems.map((child) => (
            <div key={child.id} style={{ maxWidth: "250px" }} className="p-2">
              <Recipient recipient={child}></Recipient>
            </div>
          ))}
        </div>
      )}

      {cartItems.length === 0 && (
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fillRule="currentColor"
            className="bi bi-bookmark-star me-5"
            viewBox="0 0 16 16"
          >
            <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
          </svg>
          You haven't bought any item yet. Buy one now in our mall.
        </p>
      )}
    </div>
  );
};

export default RecipientPlace;
