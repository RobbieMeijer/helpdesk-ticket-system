const initialState = {
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
  userid: '',
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICKET':
      // return {...state, action.payload};
      return { ...state, assignee: 'henkie' };
    default:
      return state;
  }
};
export default ticketReducer;

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
