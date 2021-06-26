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

const theUserReducer = (systemUser = [], action) => {
  if (action.type === 'TICKET_LIST') {
    return [...systemUser, action.payload];
  }

  return systemUser;
};

export default combineReducers({
  ticketList: ticketsReducer,
  systemUser: theUserReducer,
});
