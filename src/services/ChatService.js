import socket from 'socket.io-client';

const serverEvent = {
  CONNECTED: 'user-connected',
  DISCONNECTED: 'user-disconnected',
  IS_TYPING: 'is-typing',
  MESSAGE: 'message',
};

const clientEvent = {
  TEXT_MESSAGE: 'text-message',
  IMAGE_MESSAGE: 'image-message',
  TYPING: 'typing',
};

let client;

class ChatService {
  static connect(
    socketServerUrl,
    {
      onConnect = this.notImplemented(serverEvent.CONNECTED),
      onDisconnect = this.notImplemented(serverEvent.DISCONNECTED),
      onIsTyping = this.notImplemented(serverEvent.IS_TYPING),
      onMessage = this.notImplemented(serverEvent.MESSAGE),
    } = {},
  ) {
    client = socket(socketServerUrl);
    client.on(serverEvent.CONNECTED, onConnect);
    client.on(serverEvent.DISCONNECTED, onDisconnect);
    client.on(serverEvent.IS_TYPING, onIsTyping);
    client.on(serverEvent.MESSAGE, onMessage);
  }

  static emitText(text) {
    client.emit(clientEvent.TEXT_MESSAGE, text);
  }

  static emitImage({ url, alt }) {
    client.emit(clientEvent.IMAGE_MESSAGE, { url, alt });
  }

  static emitTyping(status) {
    client.emit(clientEvent.TYPING, status);
  }

  static disconnect() {
    client.disconnect();
  }

  static notImplemented(name) {
    return () => {
      console.log(`No action implemented for Event [${name}]`);
    };
  }
}

export default ChatService;
