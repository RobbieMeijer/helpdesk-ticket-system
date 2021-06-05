import React from 'react';
import { useSelector } from 'react-redux';

const TicketList = () => {
  // hook that extracts data from the redux store
  const ticketList = useSelector((state) => state.ticketList);
  console.log(ticketList);

  // getting all ticket data
  const getTickets = ticketList.map((ticket) => {
    const {
      ticketId,
      priority,
      issueType,
      summary,
      reporter,
      assignedTo,
      created,
      updated,
      status,
      timeRemaining,
    } = ticket;

    return (
      <tr key={ticketId}>
        <td>{priority}</td>
        <td>{issueType}</td>
        <td>{ticketId}</td>
        <td>{summary}</td>
        <td>{reporter}</td>
        <td>{assignedTo}</td>
        <td>{created}</td>
        <td>{updated}</td>
        <td>{status}</td>
        <td>{timeRemaining}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Priority</th>
          <th>Issue Type</th>
          <th>Ticket nr.</th>
          <th>Summary</th>
          <th>Reporter</th>
          <th>Assignee</th>
          <th>Created</th>
          <th>Updated</th>
          <th>Status</th>
          <th>Time Remaining</th>
        </tr>
      </thead>
      <tbody>{getTickets}</tbody>
    </table>
  );
};

export default TicketList;
