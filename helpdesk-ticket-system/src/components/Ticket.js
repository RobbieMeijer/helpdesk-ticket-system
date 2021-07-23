import React, { useEffect } from 'react';
import { useEasybase } from 'easybase-react';

const Ticket = (props) => {
  console.log('props.ticketid from ticket: ', props.ticketid);
  console.log('props from ticket: ', props);

  // deconstruct id from props object
  const { ticketid } = props;

  // easybase hook
  const { Frame, sync } = useEasybase();

  //temporary to log the store once the component lads into the view
  useEffect(() => {
    console.log('Frame(): ', Frame());

    // setup the amount of rows avalaible from remote table and begin with index 0
    // configureFrame({ limit: 20, offset: 0 });

    // synchronize with remote table
    sync();
  }, []);

  // getting all ticket data
  const renderTicket = Frame().find((ticket) => {
    const {
      priority,
      issuetype,
      summary,
      reporter,
      assignee,
      date,
      time,
      status,
      description,
    } = ticket;

    if (ticket.ticketid === ticketid) {
      console.log('ticket desciption from ticket: ', description);
      return <div>{description}</div>;
    }

    // return null;
  });

  // const renderTicket = () => {
  //   return getTicket;
  // };

  // return ticketid !== undefined ? renderTicket : null;
  return renderTicket;
};

export default Ticket;
