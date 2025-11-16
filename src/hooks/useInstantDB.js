import { init, tx } from "@instantdb/react";

const APP_ID = import.meta.env.VITE_INSTANTDB_APP_ID;
const db = init({ appId: APP_ID });

export function useInstantDB() {
  const { data, error, isLoading } = db.useQuery({
    contacts: { table: "contacts" },
    messages: { table: "messages" }
  });

  const saveContact = async (contact) => {
    await db.transact([
      tx.contacts[contact.id].update(contact)
    ]);
  };

  const saveMessage = async (msg) => {
    await db.transact([
      tx.messages[msg.id].update(msg)
    ]);
  };

  return {
    contacts: data?.contacts || [],
    messages: data?.messages || [],
    saveContact,
    saveMessage,
    error,
    isLoading
  };
}
