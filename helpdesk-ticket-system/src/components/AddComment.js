import React, { useState, useEffect, useRef } from 'react';
import { useEasybase } from 'easybase-react';
import { useAuth0 } from '@auth0/auth0-react';

import CreateCurrentDateAndTime from './CreateCurrentDateAndTime';

const AddComment = (props) => {
  // get ticket data
  const { ticketid, onAddComment, userid } = props;

  // state
  const [commentid, setCommentid] = useState();
  const [content, setContent] = useState('');
  const [reporter_name, setReporter_name] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comment_ticketid, setComment_ticketid] = useState(null);
  const [commentAdded, setCommentAdded] = useState(false);

  // user state
  const [user, setUser] = useState({});

  // easybase hook
  const { db } = useEasybase();

  // auth0 hook
  // const { user } = useAuth0();

  // useRef
  const textInput = useRef(null);

  useEffect(() => {
    setCommentid(`cmmnt${new Date().getTime()}`);
    setComment_ticketid(ticketid);
    setReporter_name(user.name);
    resetTextInput();
    setContent('');
    setCommentAdded(false);
    console.log('AddComment component rendered');
  }, [commentAdded]);

  const resetTextInput = () => {
    textInput.current.value = '';
  };

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

    // rerender ticket (parent component) with new comment
    const rerenderTicket = await onAddComment(); // callback via parent props

    //rerender add comment component
    const rerenderAddComment = setCommentAdded(true);

    // execute functions in order: only execute commentIsSubmitted
    // if uploadComment was successfull
    return [uploadComment, rerenderTicket, rerenderAddComment];
  };

  return (
    <section>
      <h2>Add comment</h2>
      <textarea
        ref={textInput}
        defaultValue={content}
        onChange={(e) => {
          // slight delay in changing the comment content state
          setTimeout(setContent(e.target.value), 800);
        }}
        onBlur={() => {
          setDate(CreateCurrentDateAndTime.date());
          setTime(CreateCurrentDateAndTime.time());
        }}
        name=""
        id=""
        cols="30"
        rows="10"
        required
      ></textarea>
      <div>
        <button onClick={addComment}>Save</button>{' '}
        <button
          onClick={() => {
            resetTextInput();
            setContent('');
          }}
        >
          Cancel
        </button>
      </div>
    </section>
  );
};

export default AddComment;
