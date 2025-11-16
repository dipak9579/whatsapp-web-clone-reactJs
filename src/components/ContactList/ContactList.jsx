import React from "react";
import "../../styles/ContactList.css";
import { useAppContext } from "../../context/AppContext";

export default function ContactList() {
  const { state, dispatch } = useAppContext();
  const { contacts, selectedContact } = state;

  return (
    <div className="contact-list">
      {contacts.map((c) => (
        <div
          key={c.id}
          className={`contact-item ${selectedContact === c.id ? "active" : ""}`}
          onClick={() =>
            dispatch({ type: "SELECT_CONTACT", payload: c.id })
          }
        >
          <div className="avatar"></div>
          <div className="details">
            <h4>{c.name}</h4>
            <p>{c.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
