const initialState = {
  ticketId: '',
  priority: '',
  issueType: '',
  summary: '',
  description: '',
  reporter: '',
  assignee: '',
  created: '',
  updated: '',
  status: '',
  timeRemaining: '',
};

const ticketReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TICKET_ID':
      return { ...state, ticketId: action.ticketId };
    case 'PRIORITY':
      return { ...state, priority: action.priority };
    case 'ISSUE_TYPE':
      return { ...state, issueType: action.issueType };
    case 'SUMMARY':
      return { ...state, summary: action.summary };
    case 'DESCRIPTION':
      return { ...state, description: action.description };
    case 'REPORTER':
      return { ...state, reporter: action.reporter };
    case 'ASSIGNEE':
      return { ...state, assignee: action.assignee };
    case 'CREATED':
      return { ...state, created: action.created };
    case 'UPDATED':
      return { ...state, updated: action.updated };
    case 'STATUS':
      return { ...state, status: action.status };
    case 'TIME_REMAINING':
      return { ...state, timeRemaining: action.timeRemaining };
    default:
      return state; // return the old state if nothing changes
  }
};

export default ticketReducer;

/*
const priority = {
  type: 'PRIORITY',
  importance: ''
};

const issueType = {
  type: 'ISSUE_TYPE',
  issue: ''
};

const ticketId = {
  type: 'TICKET_ID',
  id: 
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
