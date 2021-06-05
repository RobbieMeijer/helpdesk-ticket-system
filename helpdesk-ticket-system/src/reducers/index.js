import { combineReducers } from 'redux';

const initialTicketList = [
  {
    priority: 'high',
    issueType: 'bug',
    ticketId: 'abcd1234',
    summary: 'Lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis nulla quam. Nulla sagittis nulla a nisi condimentum, sit amet mollis dui auctor. Vivamus eu urna tristique, sollicitudin metus sed, interdum ex. Aenean iaculis convallis magna, ut vehicula sapien fermentum ut.',
    assignedTo: 'Robbie Meijer',
    reporter: 'Bertje de Boer',
    created: '14:02 13/05/2021',
    updated: '14:20 13/05/2021',
    status: 'waiting for support',
    timeRemaining: '04:00',
    requestParticipants: ['Rianna Vos', 'Ronald Peters', 'Hanna van Leeuwen'],
  },
  {
    priority: 'low',
    issueType: 'feature request',
    ticketId: 'bcde2345',
    summary: 'Pellentesque habitant',
    description:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum viverra tortor vitae dictum accumsan.',
    assignedTo: 'Rianna Vos',
    reporter: 'Birna Jansen',
    created: '14:02 13/05/2021',
    updated: '14:20 13/05/2021',
    status: 'waiting for support',
    timeRemaining: '06:00',
    requestParticipants: [
      'Robbie Meijer',
      'Ronald Peters',
      'Hanna van Leeuwen',
    ],
  },
  {
    priority: 'medium',
    issueType: 'how to',
    ticketId: 'cdef3456',
    summary: 'Integer vehicula',
    description:
      'Integer vehicula magna ut imperdiet maximus. Curabitur lacinia ante vel pellentesque pulvinar. Etiam viverra ex metus, quis convallis lorem accumsan at.',
    assignedTo: 'Ronald Peters',
    reporter: 'Boris Bakker',
    created: '14:02 13/05/2021',
    updated: '14:20 13/05/2021',
    status: 'waiting for support',
    timeRemaining: '05:00',
    requestParticipants: ['Robbie Meijer', 'Rianna Vos', 'Hanna van Leeuwen'],
  },
  {
    priority: 'urgent',
    issueType: 'technical issue',
    ticketId: 'defg4567',
    summary: 'Nunc molestie',
    description:
      'Nunc molestie a ante interdum elementum. Vestibulum hendrerit diam sed leo bibendum finibus. Cras laoreet libero quis leo vestibulum, sit amet sodales diam dignissim.',
    assignedTo: 'Hanna van Leeuwen',
    reporter: 'Svetlana Mulder',
    created: '14:02 13/05/2021',
    updated: '14:20 13/05/2021',
    status: 'waiting for support',
    timeRemaining: '03:00',
    requestParticipants: ['Robbie Meijer', 'Rianna Vos', 'Ronald Peters'],
  },
];

const ticketsReducer = (ticketList = initialTicketList, action) => {
  if (action.type === 'TICKET_LIST') {
    return [...ticketList, action.payload];
  }

  return ticketList;
};

export default combineReducers({
  ticketList: ticketsReducer,
});
