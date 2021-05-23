const initialState = 0;

export const ticketReducer = (state = initialState, action) => {
  // return state; // returning the old state

  switch (action.type) {
    case 'PRIORITY':
      // return logic for PRIORITY;
      return state + 'low';
    case 'ISSUE_TYPE':
    // return logic for ISSUE_TYPE;
    case 'TICKET_ID':
    // return logic for TICKET_ID;
    case 'SUMMARY':
    // return logic for SUMMARY;
    case 'DESCRIPTION':
    // return logic for DESCRIPTION;
    case 'REPORTER':
    // return logic for REPORTER;
    case 'ASSIGNEE':
    // return logic for ASSIGNEE;
    case 'CREATED':
    // return logic for CREATED;
    case 'UPDATED':
    // return logic for UPDATED;
    case 'STATUS':
    // return logic for STATUS;
    case 'TIME_REMAINING':
    // return logic for TIME_REMAINING;
    default:
      return state; // return the old state if nothing changes
  }
};

/*
const priority = {
  type: 'PRIORITY'
};

const issueType = {
  type: 'ISSUE_TYPE',
  issue: ''
};

const ticketId = {
  type: 'TICKET_ID'
};

const summary = {
  type: 'SUMMARY',
  text: ''
};

const description = {
  type: 'DESCRIPTION',
  text: ''
};

const reporter = {
  type: 'REPORTER'
};

const assignee = {
  type: 'ASSIGNEE',
  name: 'automatic'
};

const created = {
  type: 'CREATED'
};

const updated = {
  type: 'UPDATED'
};

const status = {
  type: 'STATUS'
};

const timeRemaining = {
  type: 'TIME_REMAINING'
};

*/
