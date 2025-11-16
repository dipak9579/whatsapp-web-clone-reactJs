import React, { createContext, useContext } from "react";
import { useChatReducer } from "../hooks/useChatReducer";
import { db } from "../instantdb/instant.ts";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useChatReducer();   // ✅ FIXED array destructuring

  return (
    <AppContext.Provider value={{ state, dispatch ,addMessage}}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}



async function addMessage(msg) {
  return db.transact({
    messages: {
      insert: [msg],
    },
  });
}
