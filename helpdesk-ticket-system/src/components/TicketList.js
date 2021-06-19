import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const TicketList = () => {
  const [timeUntilDeadline, setTimeUntilDeadline] = useState('');

  //temporary to log the store once the component lads into the view
  useEffect(() => {
    console.log(ticketList);
  }, []);

  // hook that extracts data from the redux store
  const ticketList = useSelector((state) => state.ticketList);

  // define deadline by priority category
  const deadlineInHours = (priority) => {
    switch (priority) {
      case 'urgent':
        return 1;
      case 'high':
        return 2;
      case 'medium':
        return 4;
      case 'low':
        return 8;
      default:
        return null;
    }
  };

  const getTimeRemaining = (
    year,
    month,
    day,
    deadlineInHours,
    minutes,
    seconds
  ) => {
    // const countDownTime = new Date('Sep 1, 2021 15:37:25').getTime();
    const countDownTime = new Date(
      `${month} ${day}, ${year} ${deadlineInHours}:${minutes}:${seconds}`
    ).getTime();

    // update countdown every second
    setInterval(() => {
      /// get todays date and time
      let currentTimeDate = new Date().getTime();

      /// find distance between now and countdown date
      let distance = currentTimeDate - countDownTime;

      /// calculate time for days, hours, minutes and seconds
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      /// define time until deadline
      setTimeUntilDeadline(`${hours}:${minutes}:${seconds}`);

      /// if countdown is expired display 'expired'
      // return 'Expired';
    }, 1000);
  };

  // getting all ticket data
  const getTickets = ticketList.map((ticket) => {
    const {
      ticketId,
      priority,
      issueType,
      summary,
      reporter,
      assignee,
      createdYear,
      createdMonth,
      createdDay,
      createdHours,
      createdMinutes,
      createdSeconds,
      updated,
      status,
    } = ticket;

    getTimeRemaining(
      createdYear,
      createdMonth,
      createdDay,
      deadlineInHours(priority),
      createdMinutes,
      createdSeconds
    );

    return (
      <tr key={ticketId}>
        <td>{priority}</td>
        <td>{issueType}</td>
        <td>{ticketId}</td>
        <td>{summary}</td>
        <td>{reporter}</td>
        <td>{assignee}</td>
        <td>{`${createdMonth} ${createdDay}, ${createdYear}, ${createdHours}:${createdMinutes}:${createdSeconds}`}</td>
        <td>{updated}</td>
        <td>{status}</td>
        <td>{timeUntilDeadline}</td>
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
