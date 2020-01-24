import React from 'react';
import styled from 'styled-components';

const StyledMessageList = styled.div`
  flex: 1;
  max-height: 100vh;
  overflow: auto;

  /* .ul {
    list-style: none;
    overflow-y: scroll;
    height: 80vh; */

    .ul {
      list-style: none;
    }

    .my-message {
      color: blue;
    }

    .peer-message {
      color: red;
    }

    .li {
      margin-top: 2rem;
      background: white;
      width: 30%;
      color: black;
      box-shadow: 0 6px 8px #d3d3d3;
      border-radius: 10px;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      padding-top: 0.5rem;
      padding-bottom: 0.3rem;
      margin-left: 67%;

      .body {
        border-bottom: 1px solid #ced4da;
        padding-bottom: 0.4rem;
      }
    }
  }
`;

const MessageList = ({ messages, userId }) => {
  return (
    <StyledMessageList>
      <ul className='ul'>
        {messages &&
          messages.map((message, index) => (
            <li
              key={index}
              className={
                message.senderId === userId
                  ? 'my-message'
                  : 'peer-message'
              }
            >
              <div>
                <span className='send-username'>
                  {message.senderId}
                </span>{' '}
              </div>
              <p className='message'>{message.text}</p>
            </li>
          ))}
      </ul>
    </StyledMessageList>
  );
};

export default MessageList;