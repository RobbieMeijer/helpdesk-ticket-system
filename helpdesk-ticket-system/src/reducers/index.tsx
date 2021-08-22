import { combineReducers } from 'redux';
import userReducer from './userReducer';
import ticketReducer from './ticketReducer';

export default combineReducers({
  // user: userReducer,
  // ticket: ticketReducer,
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
