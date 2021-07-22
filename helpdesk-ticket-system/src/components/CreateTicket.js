import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useEasybase } from 'easybase-react';

const CreateTicket = () => {
  // sending action to store
  // const dispatch = useDispatch();

  // easybase hook
  const { db } = useEasybase();

  // auth0 hook
  const { user, isAuthenticated } = useAuth0();

  // setting up local ticket state for temporary storage/reference
  // before sending form data to the store
  const [ticketid, setTicketid] = useState(null);
  const [assignee, setAssignee] = useState('support');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [issuetype, setIssuetype] = useState('');
  const [summary, setSummary] = useState('');
  const reporter = isAuthenticated ? user.name : 'Reporter Name';
  const [updated, setUpdated] = useState('');
  const [status, setStatus] = useState('open');
  let timeRemaining = null;
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // run code when component initially renders and rerendered
  useEffect(() => {
    // create id based on timestamp
    setTicketid(new Date().getTime());
  }, []);

  // prevent form submitting while typing
  const onFormSubmit = (event) => {
    event.preventDefault();
  };

  const setFormValue = (event) => {
    const element = event.target;
    const inputValue = element.value;

    switch (
      element.id ||
      (element.className === 'option' && element.parentElement.id)
    ) {
      case 'issuetype':
        setIssuetype(inputValue);
        break;
      case 'summary':
        setSummary(inputValue);
        break;
      case 'description':
        setDescription(inputValue);
        break;
      case 'assignee':
        setAssignee(inputValue);
        break;
      default:
        return 'not set';
    }
  };

  const getPriority = (issuetype) => {
    switch (issuetype) {
      case 'technical issue':
        return 'urgent';
      case 'bug':
        return 'high';
      case 'how to':
        return 'medium';
      case 'feature request':
        return 'low';
      default:
        return '';
    }
  };

  const createCurrentDateAndTime = () => {
    const theDate = new Date();
    const year = theDate.getFullYear();
    const month = theDate.getMonth() + 1;
    const day = theDate.getDate();
    const thisDate = `${year}-${month}-${day}`;

    // store current date in local state
    setDate(thisDate);

    const hours = theDate.getHours();
    const minutes = theDate.getMinutes();
    // const seconds = theDate.getSeconds();
    const thisTime = `${hours}:${minutes}`;

    // store current time in local state
    setTime(thisTime);

    console.log('date: ', date);
    console.log('time: ', time);
  };

  const renderTicketForm = () => {
    if (isAuthenticated) {
      return (
        <form onSubmit={onFormSubmit}>
          <h4>Create Issue</h4>
          <div>
            <label htmlFor="issuetype">Issue Type*</label>
            <select onChange={setFormValue} id="issuetype" required>
              <option className="option" defaultValue={issuetype}>
                Select an issue type
              </option>
              <option className="option" value="bug">
                Bug
              </option>
              <option className="option" value="feature request">
                Feature Request
              </option>
              <option className="option" value="how to">
                How To
              </option>
              <option className="option" value="technical issue">
                Technical Issue
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="summary">Summary*</label>
            <input onChange={setFormValue} id="summary" type="text" required />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              onChange={setFormValue}
              onBlur={createCurrentDateAndTime}
              id="description"
              rows="5"
              cols="33"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="assignee">Assignee</label>
            <select onChange={setFormValue} id="assignee">
              <option className="option" defaultValue={assignee}>
                Support
              </option>
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
            <div>
              <button>Assign to me</button>
            </div>
          </div>
          <div>
            <label htmlFor="reporter">Reporter</label>
            <input id="reporter" type="text" value={reporter} readOnly />
          </div>
          <div>
            <button onClick={onSaveTicket}>Create</button>
            <button>Cancel</button>
          </div>
        </form>
      );
    }

    return 'Please log in to create a ticket.';
  };

  const onSaveTicket = async () => {
    try {
      // input values can not be empty
      if (issuetype === '' || summary === '' || description === '') return;

      // set ticket submitted state to true
      setTicketSubmitted(true);

      // insert and update the db
      await db('TICKETLIST')
        .insert({
          assignee,
          description,
          issuetype,
          priority: getPriority(issuetype),
          reporter,
          status,
          summary,
          ticketid,
          date,
          time,
        })
        .one(); // Inserts, updates, and deletes will refresh the `frame` below
    } catch (error) {
      // error if above fails
      console.log('Error: ', error);
    }

    // dispatch({
    //   type: 'TICKET_LIST',
    //   payload: {
    //     assignee,
    //     createdYear,
    //     createdMonth,
    //     createdDay,
    //     createdHours,
    //     createdMinutes,
    //     createdSeconds,
    //     description,
    //     issueType,
    //     priority: getPriority(issueType),
    //     reporter,
    //     status,
    //     timeRemaining,
    //     summary,
    //     ticketid,
    //     updated,
    //   },
    // });
    // }
  };

  return ticketSubmitted ? 'Thank you for submitting' : renderTicketForm();
};

export default CreateTicket;
