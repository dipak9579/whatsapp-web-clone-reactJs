import { openDB } from "idb";

async function getDB() {
  return openDB("whatsapp_clone", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("contacts")) {
        db.createObjectStore("contacts", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("messages")) {
        db.createObjectStore("messages", { keyPath: "id" });
      }
    },
  });
}

export function useIndexedDB() {
  const saveContacts = async (contacts = []) => {
    try {
      const idb = await getDB();
      const tx = idb.transaction("contacts", "readwrite");
      contacts.forEach((c) => tx.store.put(c));
      await tx.done;
    } catch (e) {
      console.error("saveContacts error", e);
    }
  };

  const saveMessages = async (messages = []) => {
    try {
      const idb = await getDB();
      const tx = idb.transaction("messages", "readwrite");
      messages.forEach((m) => tx.store.put(m));
      await tx.done;
    } catch (e) {
      console.error("saveMessages error", e);
    }
  };

  const loadContacts = async () => {
    try {
      const idb = await getDB();
      return idb.getAll("contacts");
    } catch (e) {
      console.error("loadContacts error", e);
      return [];
    }
  };

  const loadMessages = async () => {
    try {
      const idb = await getDB();
      return idb.getAll("messages");
    } catch (e) {
      console.error("loadMessages error", e);
      return [];
    }
  };

  return { saveContacts, saveMessages, loadContacts, loadMessages };
}
