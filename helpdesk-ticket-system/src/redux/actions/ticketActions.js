export const getTicketAction = (currentTicket) => {
  return {
    type: 'GET_TICKET',
    payload: currentTicket,
  };
};
