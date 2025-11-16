import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import "../../styles/MessageInput.css";

export default function MessageInput({ selectedContact }) {
  const [text, setText] = useState("");
  const { dispatch, addMessage } = useAppContext();

  const send = async () => {
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      contactId: selectedContact,
      text: text.trim(),
      sender: "me",
      timestamp: Date.now(),
    };

    // ⭐ Update UI instantly
    dispatch({
      type: "SEND_MESSAGE",
      payload: { contactId: selectedContact, message: newMsg },
    });

    // ⭐ Save message into InstantDB
    try {
      await addMessage(newMsg);
      console.log("Message saved to InstantDB");
    } catch (err) {
      console.error("InstantDB save failed:", err);
    }

    // Clear input
    setText("");
  };

  return (
    <div className="message-input">
      <input
        value={text}
        placeholder="Type a message"
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
