import React from 'react';

const tickets = [
  {
    ticketId: 'abcd1234',
    issueType: 'bug',
    summary: 'Lorem ipsum',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis nulla quam. Nulla sagittis nulla a nisi condimentum, sit amet mollis dui auctor. Vivamus eu urna tristique, sollicitudin metus sed, interdum ex. Aenean iaculis convallis magna, ut vehicula sapien fermentum ut.',
    assignedTo: 'Robbie Meijer',
    reporter: 'Bertje de Boer',
    priority: 'high',
    created: '13/05/2021',
    dueDate: '13/05/2021',
    // activity: [{ comments: [], history: [], workLog: [] }],
    status: 'waiting for support',
    timeRemaining: 4,
    requestParticipants: ['Rianna Vos', 'Ronald Peters', 'Hanna van Leeuwen'],
  },
  {
    ticketId: 'bcde2345',
    issueType: 'feature request',
    summary: 'Pellentesque habitant',
    description:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum viverra tortor vitae dictum accumsan.',
    assignedTo: 'Rianna Vos',
    reporter: 'Birna Jansen',
    priority: 'low',
    created: '13/05/2021',
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
    ticketId: 'cdef3456',
    issueType: 'how to',
    summary: 'Integer vehicula',
    description:
      'Integer vehicula magna ut imperdiet maximus. Curabitur lacinia ante vel pellentesque pulvinar. Etiam viverra ex metus, quis convallis lorem accumsan at.',
    assignedTo: 'Ronald Peters',
    reporter: 'Boris Bakker',
    priority: 'medium',
    created: '13/05/2021',
    dueDate: '13/05/2021',
    // activity: [{ comments: [], history: [], workLog: [] }],
    status: 'waiting for support',
    timeRemaining: 5,
    requestParticipants: ['Robbie Meijer', 'Rianna Vos', 'Hanna van Leeuwen'],
  },
  {
    ticketId: 'defg4567',
    issueType: 'technical issue',
    summary: 'Nunc molestie',
    description:
      'Nunc molestie a ante interdum elementum. Vestibulum hendrerit diam sed leo bibendum finibus. Cras laoreet libero quis leo vestibulum, sit amet sodales diam dignissim.',
    assignedTo: 'Hanna van Leeuwen',
    reporter: 'Svetlana Mulder',
    priority: 'urgent',
    created: '13/05/2021',
    dueDate: '13/05/2021',
    // activity: [{ comments: [], history: [], workLog: [] }],
    status: 'waiting for support',
    timeRemaining: 3,
    requestParticipants: ['Robbie Meijer', 'Rianna Vos', 'Ronald Peters'],
  },
];

function Tickets() {
  // getting all ticket data
  const getTickets = tickets.map((ticket) => {
    // console.log(ticket);
    return (
      <tr>
        <td>{ticket.ticketId}</td>
        <td>{ticket.summary}</td>
        <td>{ticket.reporter}</td>
        <td>{ticket.assignedTo}</td>
        <td>{ticket.status}</td>
        <td>{ticket.created}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Summary</th>
          <th>Reporter</th>
          <th>Assignee</th>
          <th>Status</th>
          <th>Created</th>
        </tr>
      </thead>
      <tbody>{getTickets}</tbody>
    </table>
  );
}

export default Tickets;
