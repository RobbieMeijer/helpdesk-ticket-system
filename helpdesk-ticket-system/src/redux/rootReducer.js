import { combineReducers } from 'redux';
import ticketReducer from './reducers/ticketReducer';
// import userReducer from './reducers/userReducer';

const rootReducer = combineReducers({
  // user: userReducer,
  currentTicket: ticketReducer,
});

/*
the rootReducer will look like this:

const store = {
  user: {
    isLoggedIn: false,
    email: '',
    fullName: '',
    userID: '',
    userRole: ''
  },
  ticket: {
    assignee: '',
    date: '',
    description: '',
    issuetype: '',
    priority: '',
    reporter: '',
    status: '',
    summary: '',
    ticketid: '',
    time: '',
    userid: ''
  }
};
*/
export default rootReducer;
