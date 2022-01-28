import React from "react";
import { useRecipient } from "../../contexts/RecipientContext";
import Recipient from "./Recipient";

const RecipientPlace = () => {
  const { recipients, cartItems } = useRecipient();
  console.log(cartItems)

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
      <hr/>
      <h2>Your cart</h2>
      {cartItems.length > 0 && (
        <div className="d-flex flex-wrap align-items-center justify-content-center text-center">
          {cartItems.map((child) => (
            <div key={child.id} style={{ maxWidth: "250px" }} className="p-2">
              <Recipient recipient={child}></Recipient>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipientPlace;
