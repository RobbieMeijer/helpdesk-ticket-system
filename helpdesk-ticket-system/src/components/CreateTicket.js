import React, { useState, useEffect, useRef } from 'react';
// import { useDispatch } from 'react-redux';
import { useEasybase } from 'easybase-react';
import CreateCurrentDateAndTime from './CreateCurrentDateAndTime';

/** @jsx jsx */ /** @jsxRuntime classic */
import { jsx, css } from '@emotion/react';

const CreateTicket = () => {
  // ticket state
  const [ticketid, setTicketid] = useState('');
  const [assignee, setAssignee] = useState('support');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [issuetype, setIssuetype] = useState('');
  const [summary, setSummary] = useState('');
  const [updated, setUpdated] = useState('');
  const [status, setStatus] = useState('open');
  let timeRemaining = null;
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // user state
  const [user, setUser] = useState({});
  const [fullname, setFullname] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userID, setUserID] = useState('');

  // sending action to store
  // const dispatch = useDispatch();

  // easybase hook
  const { getUserAttributes, db } = useEasybase();

  // user data must be stored in the redux store later on
  const getUserData = async () => {
    const userData = await getUserAttributes();

    setUser(userData);
    setFullname(userData.fullName);
    setUserRole(userData.userRole);
    setUserID(userData.userID);

    console.log('userData: ', userData);
  };

  const refAssignee = useRef(null);

  // run code when component initially renders and rerendered
  useEffect(() => {
    // create ticket id based on timestamp
    setTicketid(`tckt${new Date().getTime()}`);

    // user data must be stored in the redux store
    getUserData();
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
        status,
        summary,
        ticketid,
        date,
        time,
        userID: user.userID,
        reporter: fullname,
      })
      .one(); // execute for one record

    // set ticket submitted state to true
    const ticketIsSubmitted = setTicketSubmitted(true);

    // execute functions in order: only execute ticketIsSubmitted
    // if uploadTicket was successfull
    return [uploadTicket, ticketIsSubmitted];

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
    console.log('userID: ', userID);

    // save current user to assignee state
    setAssignee(fullname);
    // change assignee UI to fullname of current user
    refAssignee.current.value = fullname;
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
            onChange={setFormValue}
            id="assignee"
            ref={refAssignee}
            css={css`
              margin-right: 1rem;
            `}
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
          <button
            onClick={setAssigneeToUser}
            css={css`
              margin: auto 0;
            `}
          >
            Assign to me
          </button>
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
          cols="33"
          required
        ></textarea>
      </div>
      <div className="field">{renderAssignee()}</div>
      <div className="field">
        <label htmlFor="reporter">Reporter</label>
        <input id="reporter" type="text" value={fullname} readOnly />
      </div>
      <div>
        <button
          onClick={onSaveTicket}
          css={css`
            margin-right: 1rem;
          `}
        >
          Create
        </button>
        <button onClick={onCancelTicket}>Cancel</button>
      </div>
    </form>
  );
};

export default CreateTicket;
