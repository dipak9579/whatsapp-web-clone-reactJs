import { useReducer } from "react";

const initialState = {
  contacts: [
    { id: "1", name: "John Doe", avatar: "", lastMessage: "Hey there!" },
    { id: "2", name: "Mary Smith", avatar: "", lastMessage: "See you soon!" },
    { id: "3", name: "Alex Johnson", avatar: "", lastMessage: "What's up?" }
  ],

  selectedContact: null,

  messages: {
    "1": [
      { id: 1, text: "Hello John!", sender: "me", timestamp: Date.now() },
      { id: 2, text: "How are you?", sender: "me", timestamp: Date.now() }
    ],
    "2": [
      { id: 1, text: "Hi Mary!", sender: "me", timestamp: Date.now() }
    ],
    "3": []
  }
};


function reducer(state, action) {
  switch (action.type) {
    case "SELECT_CONTACT":
      return { ...state, selectedContact: action.payload };

    case "SET_CONTACTS":
      return { ...state, contacts: action.payload || [] };

    case "SET_MESSAGES": {
      // action.payload is expected to be an array of message objects
      const grouped = {};
      (action.payload || []).forEach((m) => {
        if (!grouped[m.contactId]) grouped[m.contactId] = [];
        grouped[m.contactId].push(m);
      });
      return { ...state, messages: grouped };
    }

    case "SEND_MESSAGE": {
      const { contactId, message } = action.payload;
      return {
        ...state,
        messages: {
          ...state.messages,
          [contactId]: [...(state.messages[contactId] || []), message],
        },
      };
    }

    default:
      return state;
  }
}

export function useChatReducer() {
  return useReducer(reducer, initialState);
}
