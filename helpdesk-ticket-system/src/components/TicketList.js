import React, { useState, useEffect } from 'react';
import { useEasybase } from 'easybase-react';
import Ticket from './Ticket';

const TicketList = () => {
  // easybase stateful data
  const [ticketList, setTicketList] = useState([]);

  // to do: time remaining state stuff for tickets
  const [timeUntilDeadline, setTimeUntilDeadline] = useState('');

  // single ticket state, setting state for clicked ticket
  const [ticketClicked, setTicketClicked] = useState(false);
  const [ticketid, setTicketid] = useState('');
  const [priority, setPriority] = useState('');
  const [issuetype, setIssuetype] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');
  const [userid, setUserid] = useState('');
  const [reporter, setReporter] = useState('');

  // easybase hook
  const { getUserAttributes, db } = useEasybase();

  // getting tickets data
  const getTicketListData = async () => {
    // 1 get current user data for passing to the Ticket component
    const userData = await getUserAttributes();

    // 2 initial ticket list data not set
    let ticketListData;

    // 3 get ticketlist based on user role
    if (userData.userRole === 'support') {
      ticketListData = await db('TICKETLIST') // FROM table
        .return() // SELECT * column statement
        .limit(20) // limit the returned amount
        .all(); // execute queries returning all records true to condition
    } else {
      ticketListData = await db('TICKETLIST') // FROM table
        .return() // SELECT * column statement
        .where({ userID: userData.userID }) // WHERE condition statement
        .limit(20) // limit the returned amount
        .all(); // execute queries returning all records true to condition
    }

    // 4 store data to state
    setTicketList(ticketListData);
  };

  useEffect(() => {
    getTicketListData();
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

  // save ticket details to state, passing through data to single Ticket component
  const setTicketState = (...ticketFields) => {
    console.log('ticketFields from setTicketState: ', ticketFields);

    const [
      ticketid,
      priority,
      issuetype,
      summary,
      description,
      assignee,
      date,
      time,
      status,
      userid,
      reporter,
    ] = ticketFields;

    setTicketClicked(true);
    setTicketid(ticketid);
    setPriority(priority);
    setIssuetype(issuetype);
    setSummary(summary);
    setDescription(description);
    setAssignee(assignee);
    setDate(date);
    setTime(time);
    setStatus(status);
    setUserid(userid);
    setReporter(reporter);

    console.log('ticketClicked: ', ticketClicked);
    console.log('ticketid from list: ', ticketid);
  };

  // render ticket detail data
  const renderTicket = () => {
    return (
      <Ticket
        ticketid={ticketid}
        priority={priority}
        issuetype={issuetype}
        summary={summary}
        description={description}
        assignee={assignee}
        date={date}
        time={time}
        status={status}
        userid={userid}
        reporter={reporter}
      />
    );
  };

  // getting all ticket data
  const getTicketList = ticketList.map((ticket) => {
    const {
      ticketid,
      priority,
      issuetype,
      summary,
      description,
      assignee,
      date,
      time,
      status,
      userid,
      reporter,
    } = ticket;

    return (
      <tr
        className="cursor-pointer"
        key={ticketid}
        onClick={() =>
          setTicketState(
            ticketid,
            priority,
            issuetype,
            summary,
            description,
            assignee,
            date,
            time,
            status,
            userid,
            reporter
          )
        }
      >
        <td>{priority}</td>
        <td>{issuetype}</td>
        <td>{ticketid}</td>
        <td>{summary}</td>
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
    console.log('ticketList: ', ticketList);

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th scope="col">Priority</th>
              <th scope="col">Issue Type</th>
              <th scope="col">Ticket nr.</th>
              <th scope="col">Summary</th>
              <th scope="col">Assignee</th>
              <th scope="col">Created</th>
              <th scope="col">Updated</th>
              <th scope="col">Status</th>
              <th scope="col">Time Remaining</th>
            </tr>
          </thead>
          <tbody>{getTicketList}</tbody>
        </table>
      </div>
    );
  };

  return !ticketClicked && ticketList !== []
    ? renderTicketList()
    : renderTicket(
        ticketid,
        priority,
        issuetype,
        summary,
        description,
        assignee,
        date,
        time,
        status,
        userid,
        reporter
      );
};

export default TicketList;
