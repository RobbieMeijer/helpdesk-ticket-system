const initialState = {
  ticket: {},
};

const ticketReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_TICKET':
      return {
        ...state,
        ticket: { ...state.ticket, payload }, // the payload contains the new values to save to store
      };
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
