import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useEasybase } from 'easybase-react';

const CreateTicket = () => {
  // sending action to store
  // const dispatch = useDispatch();

  // easybase hook
  const { sync, db } = useEasybase();

  // auth0 hook
  const { user, isAuthenticated } = useAuth0();

  // setting up local ticket state for temporary storage/reference
  // before sending form data to the store
  const [ticketid, setTicketid] = useState(null),
    [assignee, setAssignee] = useState('support'),
    [createdYear, setCreatedYear] = useState(''),
    [createdMonth, setCreatedMonth] = useState(''),
    [createdDay, setCreatedDay] = useState(0),
    [createdHours, setCreatedHours] = useState(0),
    [createdMinutes, setCreatedMinutes] = useState(0),
    [createdSeconds, setCreatedSeconds] = useState(0),
    [description, setDescription] = useState(''),
    [issuetype, setIssuetype] = useState(''),
    [priority, setPriority] = useState('not set'),
    [summary, setSummary] = useState(''),
    reporter = isAuthenticated ? user.name : 'Reporter Name',
    [updated, setUpdated] = useState(''),
    [status, setStatus] = useState('open'),
    timeRemaining = null,
    [ticketSubmitted, setTicketSubmitted] = useState(false);

  // run code when component initially renders and rerendered
  useEffect(() => {
    // create id based on timestamp
    setTicketid(new Date().getTime());

    // create date of ticket creation
    createDate();
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

  const createDate = () => {
    const dateObject = new Date(),
      year = dateObject.getFullYear(),
      month = dateObject.getMonth() + 1,
      day = dateObject.getDate(),
      hours = dateObject.getHours(),
      minutes = dateObject.getMinutes(),
      seconds = dateObject.getSeconds();

    const monthAbbreviated = (month) => {
      switch (month) {
        case 1:
          return 'Jan';
        case 2:
          return 'Feb';
        case 3:
          return 'Mar';
        case 4:
          return 'Apr';
        case 5:
          return 'May';
        case 6:
          return 'Jun';
        case 7:
          return 'Jul';
        case 8:
          return 'Aug';
        case 9:
          return 'Sep';
        case 10:
          return 'Oct';
        case 11:
          return 'Nov';
        case 12:
          return 'Dec';
        default:
          return '';
      }
    };

    setCreatedYear(year);
    setCreatedMonth(monthAbbreviated(month));
    setCreatedDay(day);
    setCreatedHours(hours);
    setCreatedMinutes(minutes);
    setCreatedSeconds(seconds);
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
            <input id="reporter" type="text" value={reporter} />
          </div>
          <div>
            <button
              onClick={() => {
                onSaveTicket(
                  assignee,
                  description,
                  issuetype,
                  priority,
                  reporter,
                  status,
                  summary,
                  ticketid
                );
              }}
            >
              Create
            </button>
            <button>Cancel</button>
          </div>
        </form>
      );
    }

    return 'Please log in to create a ticket.';
  };

  const onSaveTicket = () => {
    setPriority(getPriority(issuetype));
    console.log(priority);

    // check if fields are not empty before submitting ticket
    if ((issuetype && summary && description) !== '') {
      setTicketSubmitted(true);

      db('TICKETLIST')
        .insert({
          assignee,
          description,
          issuetype,
          priority,
          reporter,
          status,
          summary,
          ticketid,
        })
        .one();

      // save local ticket data to remote db
      sync();

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
    }
  };

  return ticketSubmitted ? 'Thank you for submitting' : renderTicketForm();
};

export default CreateTicket;
