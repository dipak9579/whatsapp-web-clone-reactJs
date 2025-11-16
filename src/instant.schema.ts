import { i } from "@instantdb/core";

const _schema = i.schema({
  entities: {
    contacts: i.entity({
      name: i.string(),
      lastMessage: i.string().optional(),
      avatar: i.string().optional(),
    }),

    messages: i.entity({
      contactId: i.string(),
      text: i.string(),
      sender: i.string(),
      timestamp: i.number(),
    })
  },
  links: {},
  rooms: {}
});

type _AppSchema = typeof _schema;
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema;

export type { AppSchema };
export default schema;
