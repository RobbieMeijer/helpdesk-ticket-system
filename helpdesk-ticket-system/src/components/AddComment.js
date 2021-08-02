import React, { useState, useEffect } from 'react';
import { useEasybase } from 'easybase-react';
import { useAuth0 } from '@auth0/auth0-react';

import CreateCurrentDateAndTime from './CreateCurrentDateAndTime';

const AddComment = (props) => {
  // get ticket data
  const { ticketid } = props;

  // state
  const [commentid, setCommentid] = useState();
  const [content, setContent] = useState('');
  const [reporter_name, setReporter_name] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comment_ticketid, setComment_ticketid] = useState(null);
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // easybase hook
  const { db } = useEasybase();

  // auth0 hook
  const { user } = useAuth0();

  useEffect(() => {
    setCommentid(`cmmnt${new Date().getTime()}`);
    setComment_ticketid(ticketid);
    setReporter_name(user.name);
  }, []);

  const addComment = async () => {
    // input value can not be empty
    if (content === '') return;

    // POST Comment and update the db
    const uploadComment = await db('COMMENTS') // FROM table Comments
      .insert({
        // INSERT INTO: the values into the columns
        content,
        reporter_name,
        date,
        time,
        comment_ticketid,
        commentid,
      })
      .one(); // execute for one record

    // set ticket submitted state to true
    const commentIsSubmitted = setCommentSubmitted(true);

    // execute functions in order: only execute commentIsSubmitted
    // if uploadComment was successfull
    return [uploadComment, commentIsSubmitted];
  };

  return (
    <section>
      <h2>Add comment</h2>
      <textarea
        onChange={(e) => {
          // slight delay in changing the comment content state
          setTimeout(setContent(e.target.value), 600);
        }}
        onBlur={() => {
          setDate(CreateCurrentDateAndTime.date());
          setTime(CreateCurrentDateAndTime.time());
        }}
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
      <div>
        <button onClick={addComment}>Save</button> <button>Cancel</button>
      </div>
    </section>
  );
};

export default AddComment;
