import React, { useState, useEffect } from 'react';
import { useEasybase } from 'easybase-react';
import Ticket from './Ticket';

const TicketList = () => {
  // easybase stateful data
  const [easybaseData, setEasybaseData] = useState([]);

  // to do: time remaining state stuff for tickets
  const [timeUntilDeadline, setTimeUntilDeadline] = useState('');

  // single ticket state, setting state for clicked ticket
  const [ticketClicked, setTicketClicked] = useState(false);
  const [ticketid, setTicketid] = useState('');
  const [priority, setPriority] = useState('');
  const [issuetype, setIssuetype] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [reporter, setReporter] = useState('');
  const [assignee, setAssignee] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');

  // easybase hook
  const { db } = useEasybase();

  // getting the easybase table data
  const mounted = async () => {
    const ebData = await db('TICKETLIST').return().limit(20).all();

    // storing table data to state
    setEasybaseData(ebData);
  };

  useEffect(() => {
    // get the data from easybase when component is rendered
    mounted();
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

  const formattedDate = (date) => (date !== null ? date.slice(0, 10) : '');

  // set ticket details to state, passing through data to single Ticket component
  const setTicketState = (
    ticketid,
    priority,
    issuetype,
    summary,
    description,
    reporter,
    assignee,
    date,
    time,
    status
  ) => {
    setTicketClicked(true);
    setTicketid(ticketid);
    setPriority(priority);
    setIssuetype(issuetype);
    setSummary(summary);
    setDescription(description);
    setReporter(reporter);
    setAssignee(assignee);
    setDate(date);
    setTime(time);
    setStatus(status);

    console.log('ticketClicked: ', ticketClicked);
    console.log('ticketid from list: ', ticketid);
  };

  // render ticket detail data
  const renderTicket = (
    ticketid,
    priority,
    issuetype,
    summary,
    description,
    reporter,
    assignee,
    date,
    time,
    status
  ) => {
    return (
      <Ticket
        ticketid={ticketid}
        priority={priority}
        issuetype={issuetype}
        summary={summary}
        description={description}
        reporter={reporter}
        assignee={assignee}
        date={date}
        time={time}
        status={status}
      />
    );
  };

  // getting all ticket data
  const getTicketList = easybaseData.map((ticket) => {
    const {
      ticketid,
      priority,
      issuetype,
      summary,
      description,
      reporter,
      assignee,
      date,
      time,
      status,
    } = ticket;

    return (
      <tr
        key={ticketid}
        onClick={() =>
          setTicketState(
            ticketid,
            priority,
            issuetype,
            summary,
            description,
            reporter,
            assignee,
            date,
            time,
            status
          )
        }
      >
        <td>{priority}</td>
        <td>{issuetype}</td>
        <td>{ticketid}</td>
        <td>{summary}</td>
        <td>{reporter}</td>
        <td>{assignee}</td>
        <td>{`${formattedDate(date)} at ${time}`}</td>
        <td>{/* {updated} */}</td>
        <td>{status}</td>
        <td>{/* {timeUntilDeadline} */}</td>
      </tr>
    );
  });

  // rendering the ticket list data
  const renderTicketList = () => {
    return (
      <div>
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
          <tbody>{getTicketList}</tbody>
        </table>
      </div>
    );
  };

  return !ticketClicked
    ? renderTicketList()
    : renderTicket(
        ticketid,
        priority,
        issuetype,
        summary,
        description,
        reporter,
        assignee,
        date,
        time,
        status
      );
};

export default TicketList;
