export const ticketList = (tickets) => {
  return {
    type: 'TICKET_LIST',
    payload: tickets,
  };
};

export const systemUser = (theUser) => {
  return {
    type: 'SYSTEM_USER',
    payload: theUser,
  };
};
