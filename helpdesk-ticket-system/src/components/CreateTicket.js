import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useEasybase } from 'easybase-react';
import CreateCurrentDateAndTime from './CreateCurrentDateAndTime';

const CreateTicket = () => {
  // ticket state
  const [ticketid, setTicketid] = useState('');
  const [assignee, setAssignee] = useState('support');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [issuetype, setIssuetype] = useState('');
  const [summary, setSummary] = useState('');
  let timeRemaining = null;
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // redux state: current user
  const user = useSelector((state) => state.currentUser.payload);
  const { fullName, userRole, userID } = user;

  // easybase database hook
  const { db } = useEasybase();

  // ref
  const refAssignee = useRef(null);

  // run code when component initially renders and rerendered
  useEffect(() => {
    // create ticket id based on timestamp
    setTicketid(`tckt${new Date().getTime()}`);
  }, []);

  // prevent form submitting while typing
  const onFormSubmit = (event) => {
    event.preventDefault();
  };

  // store form values into state
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

  const onSaveTicket = async () => {
    // input values can not be empty
    if (issuetype === '' || summary === '' || description === '') return;

    // POST ticket and update the db
    const uploadTicket = await db('TICKETLIST') // FROM table Ticketlist
      .insert({
        // INSERT INTO: the values into the columns
        assignee,
        description,
        issuetype,
        priority: getPriority(issuetype),
        status: 'open',
        summary,
        ticketid,
        date,
        time,
        userID,
        reporter: fullName,
      })
      .one(); // execute for one record

    // set ticket submitted state to true
    const ticketIsSubmitted = setTicketSubmitted(true);

    // execute functions in order: only execute ticketIsSubmitted
    // if uploadTicket was successfull
    return [uploadTicket, ticketIsSubmitted];
  };

  const onCancelTicket = () => {
    // reset state of fields
    setIssuetype('');
    setSummary('');
    setDescription('');
    setAssignee('support');

    // empty/reset input fields
    document.getElementById('issuetype').value = 'Select an issue type';
    document.getElementById('summary').value = '';
    document.getElementById('description').value = '';

    const assignee = document.getElementById('assignee');
    if (assignee) {
      // only reset input field if DOM is rendered
      assignee.value = 'Support';
    }
  };

  const setAssigneeToUser = () => {
    // save current user to assignee state
    setAssignee(fullName);
    // change assignee UI to full name of current user
    refAssignee.current.value = fullName;
    console.log('refAssignee.current.value: ', refAssignee.current.value);
  };

  const renderAssignee = () => {
    // render if the user role is support
    if (userRole === 'support') {
      // get all support assignees

      // render the assignees
      return (
        <>
          <label htmlFor="assignee">Assignee</label>
          <select
            className="md:w-60 md:mr-2"
            onChange={setFormValue}
            id="assignee"
            ref={refAssignee}
          >
            <option className="option" defaultValue={assignee}>
              Support
            </option>
            <option className="option" value="Support One">
              Support One
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
          <button onClick={setAssigneeToUser}>Assign to me</button>
        </>
      );
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>Create Issue</h4>
      <div className="field">
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
      <div className="field">
        <label htmlFor="summary">Summary*</label>
        <input onChange={setFormValue} id="summary" type="text" required />
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          onChange={setFormValue}
          onBlur={() => {
            setDate(CreateCurrentDateAndTime.date());
            setTime(CreateCurrentDateAndTime.time());
          }}
          id="description"
          rows="5"
          required
        ></textarea>
      </div>
      <div className="field md:max-h-full">{renderAssignee()}</div>
      <div className="field">
        <label htmlFor="reporter">Reporter</label>
        <input
          className="focus:ring-0"
          id="reporter"
          type="text"
          value={fullName}
          readOnly
        />
      </div>
      <div className="field">
        <button className="md:ml-36" onClick={onSaveTicket}>
          Create
        </button>
        <button onClick={onCancelTicket}>Cancel</button>
      </div>
    </form>
  );
};

export default CreateTicket;
