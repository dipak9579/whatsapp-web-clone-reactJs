import React, { useRef, useEffect } from "react";
import "../../styles/ChatWindow.css";
import { useAppContext } from "../../context/AppContext";
import Message from "./Message";
import MessageInput from "./MessageInput";

export default function ChatWindow() {
  const context = useAppContext();

  if (!context) {
    console.error("ChatWindow: AppContext is undefined!");
    return <div className="chat-window">Context Error</div>;
  }

  const { state } = context;
  const selected = state?.selectedContact;

  if (!selected) {
    return (
      <div className="chat-window">
        <div className="no-chat-selected">
          <h2>Select a contact</h2>
        </div>
      </div>
    );
  }

  const messages = state.messages[selected] || [];
  const contact = state.contacts.find((c) => c.id === selected);

  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h3>{contact?.name}</h3>
      </div>

      <div className="messages">
        {messages.map((msg) => (
          <Message key={msg.id} msg={msg} />
        ))}
        <div ref={bottomRef}></div>
      </div>

      <MessageInput selectedContact={selected} />
    </div>
  );
}
