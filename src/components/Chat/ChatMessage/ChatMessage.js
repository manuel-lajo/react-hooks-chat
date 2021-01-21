import React from 'react';
import classes from './ChatMessage.module.scss';

const ChatMessage = props => {
  const { username, time, innerElements } = props;

  const encodedUsername = encodeURIComponent(username);
  const params = `name=${encodedUsername}&background=f5f5f5&font-size=0.35&bold=true`;
  const avatarSrc = `https://ui-avatars.com/api/?${params}`;

  return (
    <div className={classes['chat-message-container']}>
      <div className={classes['user-avatar-container']}>
        <img
          className={classes['user-avatar']}
          src={avatarSrc}
          alt={username}
        />
      </div>
      <div>
        <div>
          <label className={classes['username-label']}>{username}</label>
          <label className={classes['time-label']}>{time}</label>
        </div>
        {innerElements.map(({ type, text, url, alt }, index) => (
          <div key={index} className={classes['message-container']}>
            {type === 'text' ? (
              <label>{text}</label>
            ) : (
              <img src={url} alt={alt} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;
