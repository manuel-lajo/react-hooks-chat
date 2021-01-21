import React, { useState, useContext } from 'react';
import UsernameContext from '../../contexts/UsernameContext';
import useInputFocus from '../../hooks/useInputFocus';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import classes from './JoinChat.module.scss';

const JoinChat = props => {
  const [, setUsernameContext] = useContext(UsernameContext);
  const [username, setUsername] = useState('');
  const inputRef = useInputFocus();

  const onSubmit = event => {
    event.preventDefault();
    setUsernameContext(username);
    props.history.push('/chat');
  };

  return (
    <div className={classes['join-chat-container']}>
      <form className={classes['join-chat-content']} onSubmit={onSubmit}>
        <div className={classes['header-text']}>Join chat</div>
        <div className={classes['input-container']}>
          <Input
            ref={inputRef}
            label="Please enter your username"
            value={username}
            onChange={event => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className={classes['button-container']}>
          <Button type="submit" disabled={!username.trim()}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JoinChat;
