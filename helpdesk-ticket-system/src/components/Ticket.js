import React, { useState, useEffect } from 'react';
import { useEasybase } from 'easybase-react';
import AddComment from './AddComment';

import CreateCurrentDateAndTime from './CreateCurrentDateAndTime';

const Ticket = (props) => {
  // deconstruct ticket details from clicked ticket parent component
  const {
    ticketid,
    priority,
    summary,
    description,
    assignee,
    status,
    userid,
    reporter,
  } = props;

  // all comments state
  const [comments, setComments] = useState([]);

  // single comment state
  const [comment, setComment] = useState({});
  const [updatedCommentContent, setUpdatedCommentContent] = useState('');
  const [commentDateUpdated, setCommentDateUpdated] = useState('');
  const [commentTimeUpdated, setCommentTimeUpdated] = useState('');
  const [commentEditable, setCommentEditable] = useState(false);
  const [commentDeleted, setCommentDeleted] = useState(false);
  const [commentAdded, setCommentAdded] = useState(false);
  const [commentDate, setCommentDate] = useState('');
  const [commentTime, setCommentTime] = useState('');

  // current user logged in state
  const [currentUserId, setCurrentUserId] = useState('');

  // easybase hook
  const { getUserAttributes, db } = useEasybase();

  const getCommentsData = async () => {
    // getting the data: comments linked to current ticket
    const commentsData = await db('COMMENTS') // FROM table
      .return() // SELECT * column statement
      .where({ comment_ticketid: ticketid }) // WHERE condition statement
      .orderBy({ by: 'date' }, { by: 'time' }) // ORDER BY statement
      .all(); // execute queries returning all records true to condition

    // save requested data to state
    setComments(commentsData);
  };

  // need to be retrieved from redux later on
  const getUserData = async () => {
    const userData = await getUserAttributes();

    setCurrentUserId(userData.userID);
  };

  useEffect(() => {
    console.log('ticket component rendered');
    console.log('comments: ', comments);

    // get the data from easybase when component is rendered
    getCommentsData();
    getUserData();

    // state reset
    setCommentDeleted(false);
    setCommentAdded(false);
  }, [commentDeleted, commentAdded]); // rerender ticket when a comment is deleted or added

  const editComment = (commentKey) => {
    // must be refactored with useRef
    const textarea = document.getElementById(commentKey);
    textarea.disabled = false;
  };

  const saveComment = async (commentKey) => {
    // must be refactored with useRef
    const textarea = document.getElementById(commentKey);
    textarea.disabled = true;

    await db('COMMENTS') // FROM table comments
      .where({ _key: commentKey }) // WHERE condition current comment record
      .set({
        content: updatedCommentContent,
        date: commentDate,
        time: commentTime,
      }) // change columns value of record
      .one(); // execute queries for current record
  };

  const deleteComment = async (commentKey) => {
    await db('COMMENTS') // FROM table comments
      .delete() // DELETE
      .where({ _key: commentKey }) // WHERE condition deleting record with the current key
      .one(); // execute queries for current record

    // change state commentDeleted to true, so the ticket component will
    // rerender with the updated comments beneath ticket
    setCommentDeleted(true);
  };

  const onAddComment = () => {
    setCommentAdded(true);
  };

  const renderCommentButtons = (commentKey, comment_userid) => {
    // if comment user id equals current logged in user id
    // then render these buttons
    if (comment_userid === currentUserId) {
      return (
        <>
          <button
            onClick={() => {
              editComment(commentKey);
            }}
          >
            Edit
          </button>
          <button
            onClick={(e) => {
              saveComment(commentKey);
            }}
          >
            Save
          </button>
          <button
            onClick={() => {
              deleteComment(commentKey);
            }}
          >
            Delete
          </button>
        </>
      );
    }
  };

  // render all comment data linked to ticket from state
  const renderCommentList = comments.map((comment) => {
    // get the comment fields data of single comment
    const { content, reporter, userid, _key } = comment;

    const setCommentTextHeight = async () => {
      const key = await _key;
      const el = document.getElementById(`${key}`);

      if (el) {
        el.style.height = `${el.scrollHeight}px`;
      }
    };

    return (
      <article key={_key}>
        <h3>{reporter} .. minute(s) ago</h3>
        <textarea
          name="commentContent"
          id={_key}
          defaultValue={content}
          disabled
          onLoad={setCommentTextHeight()}
          onChange={(e) => {
            // slight delay in changing the comment content state
            setTimeout(setUpdatedCommentContent(e.target.value), 800);
          }}
          onBlur={() => {
            setCommentDate(CreateCurrentDateAndTime.date());
            setCommentTime(CreateCurrentDateAndTime.time());
          }}
        ></textarea>
        {renderCommentButtons(_key, userid)}
      </article>
    );
  });

  // render all ticket data to the UI
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
            <AddComment
              ticketid={ticketid} // ticket id from this ticket
              onAddComment={onAddComment}
            />
          </section>
        </main>
        <aside>
          <asideSection>
            <h4>Status</h4>
            <p>{status}</p> <button>change status</button>
          </asideSection>
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
  };

  return ticketid !== undefined
    ? renderTicket(ticketid)
    : 'There is no such ticket... please try again later';
};

export default Ticket;
