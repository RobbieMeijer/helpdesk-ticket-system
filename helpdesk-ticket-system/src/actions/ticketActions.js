const ticket = (ticket) => {
  return {
    type: 'TICKET',
    payload: ticket,
  };
};
export default ticket;
