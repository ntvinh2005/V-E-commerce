import React from "react";

const Message = ({ message, owner, color }) => {
  return (
    <div className="chat-bubble" style={{backgroundColor: color}}>
      <strong>{owner}:</strong> {message}
    </div>
  );
};

export default Message;
