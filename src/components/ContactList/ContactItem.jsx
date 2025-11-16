import React from "react";
import { useAppContext } from "../../context/AppContext";
import "../../styles/ContactItem.css";
export default function ContactItem({ contact }) {
  const { state, dispatch } = useAppContext();

  const isActive = state.selectedContact === contact.id;

  return (
    <div
      onClick={() =>
        dispatch({ type: "SELECT_CONTACT", payload: contact.id })
      }
      className={`contact-item ${isActive ? "active" : ""}`}
    >
      {contact.name}
    </div>
  );
}
