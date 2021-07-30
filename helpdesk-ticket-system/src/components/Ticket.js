import React, { useState, useEffect } from 'react';
import { useEasybase } from 'easybase-react';

const Ticket = (props) => {
  console.log('props from ticket: ', props);

  // deconstruct ticket details from props object
  const {
    ticketid,
    priority,
    summary,
    description,
    reporter,
    assignee,
    status,
  } = props;

  // easybase stateful data
  const [easybaseData, setEasybaseData] = useState([]);

  // easybase hook
  const { db } = useEasybase();

  // getting the easybase table data
  const mounted = async () => {
    const ebData = await db('COMMENTS').return().limit(20).all();

    const commentsLinkedToTicket = ebData.filter(
      (comment) => comment.comment_ticket_id === ticketid
    );

    // storing table data to state
    setEasybaseData(commentsLinkedToTicket);
  };

  useEffect(() => {
    // get the data from easybase when component is rendered
    mounted();
  }, []);

  // render all comment data linked to ticket
  const renderCommentList = easybaseData.map((comment) => {
    console.log(comment);
    const { content, reporter_name, _key } = comment;

    return (
      <article key={_key}>
        <h3>{reporter_name} .. minute(s) ago</h3>
        <p>{content}</p>
        <div>
          <button>Edit</button> <button>Delete</button>
        </div>
      </article>
    );
  });

  // getting all ticket data
  const renderTicket = () => {
    return (
      <div key={ticketid}>
        <main>
          <section>
            <h1>{summary}</h1>
            <small>Ticket ID: {ticketid}</small>
            <article>
              <h2>{reporter} raised this request</h2>
              <h3>Description</h3>
              <p>{description}</p>
            </article>
          </section>
          <section>
            <h2>Comments</h2>
            {renderCommentList}
          </section>
          <section>
            <h2>Add comment</h2>
            <form action="">
              <textarea name="" id="" cols="30" rows="10"></textarea>
              <div>
                <button>Save</button> <button>Cancel</button>
              </div>
            </form>
          </section>
        </main>
        <aside>
          <section>
            <h4>Status</h4>
            <p>{status}</p> <button>change status</button>
          </section>
          <section>
            <h4>SLA</h4>
            <p>6 hours time to done</p>
          </section>
          <section>
            <h4>Assignee</h4>
            <p>{assignee}</p>
          </section>
          <section>
            <h4>Reporter</h4>
            <p>{reporter}</p>
          </section>
          <section>
            <h4>Request participants</h4>
            <select id="assignee">
              <option className="option">Support</option>
              <option className="option" value="Robbie Meijer">
                Robbie Meijer
              </option>
              <option className="option" value="Rianna Vos">
                Rianna Vos
              </option>
              <option className="option" value="Ronald Peters">
                Ronald Peters
              </option>
              <option className="option" value="Hanna van Leeuwen">
                Hanna van Leeuwen
              </option>
            </select>
            <h4>Priority</h4>
            <p>{priority}</p>
          </section>
          <section>
            <h4>Due date</h4>
            <p>None</p>
          </section>
        </aside>
      </div>
    );
    // }
  };

  return ticketid !== undefined
    ? renderTicket(ticketid)
    : 'There is no such ticket... please try again later';
};

export default Ticket;
