import React from 'react';

const Ticket = (props) => {
  console.log('props from ticket: ', props);

  // deconstruct id from props object
  const {
    ticketid,
    priority,
    summary,
    description,
    reporter,
    assignee,
    status,
  } = props;

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
            <article>
              <h3>Reporter Name 1 minute ago</h3>
              <p>
                Proin eget iaculis ex. In hendrerit massa sit amet ante
                tincidunt.
              </p>
              <div>
                <button>Edit</button> <button>Delete</button>
              </div>
            </article>
            <article>
              <h3>Reporter Name 32 seconds ago</h3>
              <p>
                Fusce molestie aliquam nunc, non ornare diam fringilla quis.
                Quisque consectetur non nunc accumsan vestibulum. Sed aliquam
                tristique magna non lobortis. Duis posuere, ligula nec suscipit
                tempus, orci augue sollicitudin leo, vel bibendum nibh augue
                bibendum urna. Donec vitae pretium tortor. Pellentesque habitant
                morbi tristique senectus et netus et malesuada fames ac turpis
                egestas. Aenean vel condimentum felis.
              </p>
              <div>
                <button>Edit</button> <button>Delete</button>
              </div>
            </article>
          </section>
          <section>
            <h2>Add internal note | Reply to customer</h2>
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
