export const ticketList = (tickets) => {
  return {
    type: 'TICKET_LIST',
    payload: tickets,
  };
};
