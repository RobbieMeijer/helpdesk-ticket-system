import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const CreateTicket = () => {
  const [ticketId, setTicketId] = useState(null);
  const [issueType, setIssueType] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('automatic');
  const reporter = 'Reporter Name';
  const dispatch = useDispatch();
  const ticket = useSelector((state) => state);

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
    console.log(
      getPriority(issueType),
      issueType,
      summary,
      description,
      assignee,
      reporter
    );

    // dispatch({ type: 'PRIORITY', importance: getPriority(issueType) });
    // dispatch({ type: 'ISSUE_TYPE', issue: issueType });
    // dispatch({ type: 'TICKET_ID', id: ticketId });
    // dispatch({ type: 'SUMMARY', text: summary });
    // dispatch({ type: 'DESCRIPTION', text: description });
    dispatch({ type: 'ASSIGNEE', name: assignee });

    console.log(ticket);
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
