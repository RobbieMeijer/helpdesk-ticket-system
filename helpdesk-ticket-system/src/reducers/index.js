import { combineReducers } from 'redux';

// o.a. prototype voor een ticket object
// const initialTicketList = [
//   {
//     priority: '',
//     issueType: '',
//     ticketId: '',
//     summary: '',
//     description: '',
//     assignee: '',
//     reporter: '',
//     created: '',
//     updated: '',
//     status: '',
//     timeRemaining: '',
//   },
// ];

const ticketsReducer = (ticketList = [], action) => {
  if (action.type === 'TICKET_LIST') {
    return [...ticketList, action.payload];
  }

  return ticketList;
};

export default combineReducers({
  ticketList: ticketsReducer,
});
