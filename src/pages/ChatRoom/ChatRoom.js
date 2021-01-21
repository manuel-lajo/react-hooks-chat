import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from 'react';
import { Redirect } from 'react-router-dom';
import UsernameContext from '../../contexts/UsernameContext';
import ChatPanel from '../../components/Chat/ChatPanel/ChatPanel';
import ChatService from '../../services/ChatService';
import DateService from '../../services/DateService';
import classes from './ChatRoom.module.scss';

const ChatRoom = () => {
  const [username] = useContext(UsernameContext);
  const [messages, setMessages] = useState([]);
  const [typers, setTypers] = useState([]);
  const typingRef = useRef();

  useEffect(() => {
    ChatService.connect(
      `https://pager-hiring.herokuapp.com/?username=${username}`,
      {
        onConnect: onConnection('user-connected'),
        onDisconnect: onConnection('user-disconnected'),
        onIsTyping,
        onMessage,
      },
    );

    return () => {
      ChatService.disconnect();
    };
  }, [username, onIsTyping]);

  const onConnection = eventName => username => {
    console.log(`Event [${eventName}] received: user ${username}`);
  };

  const onIsTyping = useCallback(
    typers => {
      const otherActiveTypers = Object.entries(typers).reduce(
        (acc, [user, status]) =>
          user !== username && status === true ? [...acc, user] : acc,
        [],
      );
      setTypers(otherActiveTypers);
    },
    [username],
  );

  const onMessage = message => {
    const { type, username, time: messageTime, ...otherProps } = message;

    // If incomming message is send in same minute and by same user, we group it with previous message
    // This could be improved considering messages from same user within certain ammount of time (2-5 minutes)
    setMessages(prevMessages => {
      const id = `${new Date(messageTime).getTime()}-${username}`;
      const time = DateService.formatTime(messageTime);
      const lastMessage = prevMessages[prevMessages.length - 1];
      let newMessages;

      if (lastMessage?.username !== username || lastMessage?.time !== time) {
        newMessages = [
          ...prevMessages,
          {
            id,
            username,
            time,
            innerElements: [{ type, ...otherProps }],
          },
        ];
      } else {
        newMessages = prevMessages.map(message => ({
          ...message,
          innerElements: [...message.innerElements],
        }));

        newMessages[newMessages.length - 1].innerElements = [
          ...lastMessage.innerElements,
          { type, ...otherProps },
        ];
      }

      return newMessages;
    });
  };

  return (
    <>
      {!username && <Redirect to="/join" />}
      {username && (
        <div ref={typingRef} className={classes['chat-room-container']}>
          <ChatPanel
            messages={messages}
            typers={typers}
            onSendText={ChatService.emitText}
            onSendImage={ChatService.emitImage}
            onTyping={() => {
              ChatService.emitTyping(true);
              typingRef.current && clearTimeout(typingRef.current);
              typingRef.current = setTimeout(() => {
                ChatService.emitTyping(false);
              }, 1500);
            }}
          />
        </div>
      )}
    </>
  );
};

export default ChatRoom;
