import React from "react";
import "../../styles/Message.css";

export default function Message({ msg }) {
  return (
    <div className={`message ${msg.sender === "me" ? "me" : "other"}`}>
      <div className="bubble">
        <p className="text">{msg.text}</p>
        <div className="time">{new Date(msg.timestamp).toLocaleTimeString()}</div>
      </div>
    </div>
  );
}
