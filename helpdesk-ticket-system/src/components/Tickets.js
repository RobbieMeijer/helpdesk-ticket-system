import React from 'react';

const tickets = [
  {
    issueType: 'bug',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis nulla quam. Nulla sagittis nulla a nisi condimentum, sit amet mollis dui auctor. Vivamus eu urna tristique, sollicitudin metus sed, interdum ex. Aenean iaculis convallis magna, ut vehicula sapien fermentum ut.',
    assignedTo: 'Robbie Meijer',
    reporter: 'Bertje de Boer',
    priority: 'high',
    dateCreated: '13/05/2021',
    dueDate: '13/05/2021',
    // activity: [{ comments: [], history: [], workLog: [] }],
    status: 'waiting for support',
    timeRemaining: 4,
    requestParticipants: ['Rianna Vos', 'Ronald Peters', 'Hanna van Leeuwen'],
  },
  {
    issueType: 'feature request',
    description:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum viverra tortor vitae dictum accumsan.',
    assignedTo: 'Rianna Vos',
    reporter: 'Birna Jansen',
    priority: 'low',
    dateCreated: '13/05/2021',
    dueDate: '13/05/2021',
    // activity: [{ comments: [], history: [], workLog: [] }],
    status: 'waiting for support',
    timeRemaining: 6,
    requestParticipants: [
      'Robbie Meijer',
      'Ronald Peters',
      'Hanna van Leeuwen',
    ],
  },
  {
    issueType: 'how to',
    description:
      'Integer vehicula magna ut imperdiet maximus. Curabitur lacinia ante vel pellentesque pulvinar. Etiam viverra ex metus, quis convallis lorem accumsan at.',
    assignedTo: 'Ronald Peters',
    reporter: 'Boris Bakker',
    priority: 'medium',
    dateCreated: '13/05/2021',
    dueDate: '13/05/2021',
    // activity: [{ comments: [], history: [], workLog: [] }],
    status: 'waiting for support',
    timeRemaining: 5,
    requestParticipants: ['Robbie Meijer', 'Rianna Vos', 'Hanna van Leeuwen'],
  },
  {
    issueType: 'technical issue',
    description:
      'Nunc molestie a ante interdum elementum. Vestibulum hendrerit diam sed leo bibendum finibus. Cras laoreet libero quis leo vestibulum, sit amet sodales diam dignissim.',
    assignedTo: 'Hanna van Leeuwen',
    reporter: 'Svetlana Mulder',
    priority: 'urgent',
    dateCreated: '13/05/2021',
    dueDate: '13/05/2021',
    // activity: [{ comments: [], history: [], workLog: [] }],
    status: 'waiting for support',
    timeRemaining: 3,
    requestParticipants: ['Robbie Meijer', 'Rianna Vos', 'Ronald Peters'],
  },
];

function Tickets() {
  return <div>Tickets Component</div>;
}

export default Tickets;
