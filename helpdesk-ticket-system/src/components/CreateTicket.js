import React from 'react';

const CreateTicket = () => {
  return (
    <form>
      <h4>Create Issue</h4>
      <div>
        <label htmlFor="issueType">Issue Type*</label>
        <select id="issueType">
          <option value="none" selected disabled hidden>
            Select an issue type
          </option>
          <option value="bug">Bug</option>
          <option value="feature request">Feature Request</option>
          <option value="how to">How To</option>
          <option value="technical issue">Technical Issue</option>
        </select>
      </div>
      <div>
        <label htmlFor="summary">Summary*</label>
        <input id="summary" type="text" required />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" rows="5" cols="33"></textarea>
      </div>
      <div>
        <label htmlFor="assignee">Assignee</label>
        <select id="assignee">
          <option value="automatic">Automatic</option>
          <option value="Robbie Meijer">Robbie Meijer</option>
          <option value="Rianna Vos">Rianna Vos</option>
          <option value="Ronald Peters">Ronald Peters</option>
          <option value="Hanna van Leeuwen">Hanna van Leeuwen</option>
        </select>
        <div>
          <a href="#">Assign to me</a>
        </div>
      </div>
      <div>
        <label htmlFor="reporter">Reporter</label>
        <input id="reporter" type="text" value="Some Name" />
      </div>
      <div>
        <button>Create</button>
        <button>Cancel</button>
      </div>
    </form>
  );
};

export default CreateTicket;
