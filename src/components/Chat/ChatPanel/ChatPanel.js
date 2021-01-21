import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from '../ChatMessage/ChatMessage';
import Input from '../../Input/Input';
import classes from './ChatPanel.module.scss';

const ChatPanel = props => {
  const { messages, typers, onSendText, onSendImage, onTyping } = props;

  const [message, setMessage] = useState('');
  const inputRef = useRef();
  const bottomRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      bottomRef.current && bottomRef.current.scrollIntoView();
    }, 500);
  }, []);

  const onSubmit = async event => {
    event.preventDefault();
    const [firstSegment, query] = message.trim().split('/gif ');

    if (firstSegment === '' && !!query) {
      const apiKey = 'e813lFtItA3uKLyFZgEsa2SO2zjwJbSW';
      const params = `api_key=${apiKey}&q=${encodeURIComponent(query)}`;

      try {
        const rawResponse = await fetch(
          `https://api.giphy.com/v1/gifs/search?${params}`,
        );
        const response = await rawResponse.json();
        if (!response.data) {
          throw new Error(`Giphy API responded with: ${response.message}`);
        } else {
          const [gif] = response.data;
          // Using fixed_height_small in order to not overcharge the chat with big gif
          onSendImage({
            url: gif.images.fixed_height_small.url,
            alt: gif.title,
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    } else if (firstSegment !== undefined && query !== undefined) {
      // This is for accepting messages that contain substring 'gif ' within it
      //  i.e. 'hey, try this commad: /gif [something] it's cool!'
      onSendText(message.trim());
    } else {
      onSendText(firstSegment);
    }

    setMessage('');
  };

  let typingContent = null;
  if (typers.length) {
    const [typer] = typers;
    typingContent = (
      <div className={classes['typers-label']}>
        {typers.length > 1 ? 'People are typing...' : `${typer} is typing...`}
      </div>
    );
  }

  return (
    <form className={classes['chat-panel-container']} onSubmit={onSubmit}>
      <div className={classes['messages-container']}>
        {messages.map(message => (
          <ChatMessage key={message.id} {...message} />
        ))}
        <div ref={bottomRef}></div>
      </div>
      <div className={classes['input-container']}>
        <Input
          ref={inputRef}
          placeholder="Message"
          value={message}
          onChange={event => {
            setMessage(event.target.value);
            onTyping();
          }}
          rightContent={
            <button
              type="submit"
              className={classes['send-button']}
              disabled={!message.trim()}
            >
              Send
            </button>
          }
        />
        {typingContent}
      </div>
    </form>
  );
};

export default ChatPanel;
