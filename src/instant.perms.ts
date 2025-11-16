// Allow public read + write (like Firebase demo)
export default {
  rules: {
    contacts: {
      read: true,
      write: true,
    },
    messages: {
      read: true,
      write: true,
    }
  }
};
