import React, { useState } from "react";

import ContactList from "./components/ContactList/ContactList";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import "./styles/app.css";

export default function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (

      <div className="app-root">
        <aside className={`left-col ${showSidebar ? "open" : ""}`}>
          <ContactList onSelect={() => setShowSidebar(false)} />
        </aside>

        <main className="right-col">
          <button
            className="mobile-menu-btn"
            aria-label="Toggle contacts"
            onClick={() => setShowSidebar((s) => !s)}
          >
            ☰
          </button>

          <ChatWindow />
        </main>
      </div>
  
  );
}
