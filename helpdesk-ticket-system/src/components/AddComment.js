import React, { useState, useEffect, useRef } from 'react';
import { useEasybase } from 'easybase-react';

import CreateCurrentDateAndTime from './CreateCurrentDateAndTime';

const AddComment = (props) => {
  // get ticket data from parent component
  const { ticketid, onAddComment } = props;

  // add single comment state
  const [commentid, setCommentid] = useState();
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comment_ticketid, setComment_ticketid] = useState('');
  const [commentAdded, setCommentAdded] = useState(false);
  const [reporter, setReporter] = useState('');
  const [userid, setUserid] = useState('');

  // easybase hook
  const { getUserAttributes, db } = useEasybase();

  // useRef
  const textInput = useRef('');

  // get user data, must be retrieved from redux later on
  const getUserData = async () => {
    const userData = await getUserAttributes();

    setUserid(userData.userID);
    setReporter(userData.fullName);
  };

  useEffect(() => {
    console.log('AddComment component rendered');

    getUserData();
    setCommentid(`cmmnt${new Date().getTime()}`);
    setComment_ticketid(ticketid);
    resetTextInput();
    setContent('');
    setCommentAdded(false);
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
        date,
        time,
        commentid,
        userid,
        comment_ticketid,
        reporter,
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
