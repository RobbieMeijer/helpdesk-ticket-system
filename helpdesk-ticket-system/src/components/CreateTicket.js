import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CreateTicket = () => {
  // sending action to store
  const dispatch = useDispatch();

  // setting up local ticket state for temporary storage/reference
  // before sending form data to the store
  const [ticketId, setTicketId] = useState(null);
  const [issueType, setIssueType] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('automatic');
  const reporter = 'Reporter Name';

  useEffect(() => {
    setTicketId(Date());
  }, []);

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
      case 'issueType':
        setIssueType(inputValue);
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

  const getPriority = (issueType) => {
    switch (issueType) {
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

  const onSaveTicket = () => {
    dispatch({
      type: 'TICKET_LIST',
      payload: {
        priority: getPriority(issueType),
        ticketId: ticketId,
        issueType,
        summary,
        description,
        assignee,
        reporter,
      },
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4>Create Issue</h4>
      <div>
        <label htmlFor="issueType">Issue Type*</label>
        <select onClick={setFormValue} id="issueType" required>
          <option className="option" value="none" selected disabled hidden>
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
        <select onClick={setFormValue} id="assignee">
          <option className="option" value="automatic">
            Automatic
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
          <a href="#">Assign to me</a>
        </div>
      </div>
      <div>
        <label htmlFor="reporter">Reporter</label>
        <input id="reporter" type="text" value={reporter} />
      </div>
      <div>
        <button onClick={onSaveTicket}>Create</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default CreateTicket;
