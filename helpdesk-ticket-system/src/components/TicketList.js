import React, { useState, useEffect } from 'react';
import { useEasybase } from 'easybase-react';

const TicketList = () => {
  const [timeUntilDeadline, setTimeUntilDeadline] = useState('');

  // easybase hook
  const { Frame, configureFrame, sync } = useEasybase();

  //temporary to log the store once the component lads into the view
  useEffect(() => {
    // setup the amount of rows avalaible from remote table and begin with index 0
    configureFrame({ limit: 3, offset: 0 });

    // synchronize with remote table
    sync();
  }, []);

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
  const getTickets = Frame().map((ticket) => {
    const {
      ticketid,
      priority,
      issuetype,
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

    return (
      <tr key={ticketid}>
        <td>{priority}</td>
        <td>{issuetype}</td>
        <td>{ticketid}</td>
        <td>{summary}</td>
        <td>{reporter}</td>
        <td>{assignee}</td>
        <td>
          {/* {`${createdMonth} ${createdDay}, ${createdYear}, ${createdHours}:${createdMinutes}:${createdSeconds}`}*/}
        </td>
        <td>{/* {updated} */}</td>
        <td>{status}</td>
        <td>{/* {timeUntilDeadline} */}</td>
      </tr>
    );
  });

  return (
    <div>
      <h4>rendering content from remote table/db</h4>
      <hr />
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
    </div>
  );
};

export default TicketList;
