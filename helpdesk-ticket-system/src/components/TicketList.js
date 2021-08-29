import React, { useState, useEffect } from 'react';
import { useEasybase } from 'easybase-react';
import Ticket from './Ticket';
import { useDispatch } from 'react-redux';
import { getTicketAction } from '../redux/actions/ticketActions';

const TicketList = () => {
  // easybase stateful data
  const [ticketList, setTicketList] = useState([]);

  // to do: time remaining state stuff for tickets
  const [timeUntilDeadline, setTimeUntilDeadline] = useState('');

  // single ticket state, setting state for clicked ticket
  const [ticketClicked, setTicketClicked] = useState(false);
  const dispatch = useDispatch();

  // state: ticket list options and pagination
  const [maxTicketsPage, setMaxTicketsPage] = useState(10);
  const [pageOrderBy, setPageOrderBy] = useState({ by: 'date', sort: 'desc' });
  const [currentOffset, setCurrentOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
        .limit(maxTicketsPage) // limit the returned amount
        .offset(currentOffset) // pagination
        .orderBy(pageOrderBy) // order and sorting table
        .all(); // execute queries returning all records true to condition
    } else {
      ticketListData = await db('TICKETLIST') // FROM table
        .return() // SELECT * column statement
        .where({ userID: userData.userID }) // WHERE condition statement
        .limit(maxTicketsPage) // limit the returned amount
        .offset(currentOffset) // pagination
        .orderBy(pageOrderBy) // order and sorting table
        .all(); // execute queries returning all records true to condition
    }

    // 4 store data to state
    if (ticketListData !== undefined) {
      setTicketList(ticketListData);
    }
  };

  useEffect(() => {
    getTicketListData();
  }, [currentOffset]);

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

  // getting all ticket data
  const getTicketList = ticketList.map((ticket) => {
    const {
      ticketid,
      priority,
      issuetype,
      summary,
      assignee,
      date,
      time,
      status,
    } = ticket;

    return (
      <tr
        className="cursor-pointer"
        key={ticketid}
        onClick={() => {
          dispatch(getTicketAction({ ...ticket }));
          setTicketClicked(true);
        }}
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

  // pagination
  const getPage = (pageChange) => {
    setCurrentOffset(currentOffset + pageChange);
    getCurrentPage(pageChange);
  };

  // set currentpage
  const getCurrentPage = (pageChange) => {
    if (pageChange === 10) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  // rendering the ticket list data
  const renderTicketList = () => {
    return (
      <>
        <nav>
          Sort by: &nbsp;
          <button>priority</button>
          <button>date</button>
          <button>status</button>
        </nav>
        <br />
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
        <br />
        <nav>
          <button
            onClick={() =>
              currentPage !== 1
                ? getPage(maxTicketsPage - 2 * maxTicketsPage)
                : null
            }
          >
            {'<'}
          </button>
          &nbsp; {currentPage} &nbsp;&nbsp;&nbsp;
          <button
            onClick={() =>
              ticketList.length === maxTicketsPage
                ? getPage(maxTicketsPage)
                : null
            }
          >
            {'>'}
          </button>
        </nav>
      </>
    );
  };

  return !ticketClicked && ticketList !== [] ? renderTicketList() : <Ticket />;
};

export default TicketList;
