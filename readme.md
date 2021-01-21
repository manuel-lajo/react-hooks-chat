# React Chat Application

This is a Web Page Chat application implemented using React. It uses a socket.io Backend Service.

You can run & test it [here](https://react-chat-59463.web.app)

## 📜 Features

- Join page for accessing the application
- Send and receive messages in real time
- See messages that were sent while the user was not connected
- Typing indicator when other users are typing
- User avatar with initials
- Giphy API integration using `/gif <query>` command

## 💯 How to run

```bash
npm install
npm start
```

## 💻 Build Configuration & Tooling

- Diferent webpack configuration files for development and production
- Target modern browsers using ES Modules and Bable presets
- Sass & CSS Modules
- CSS minified bundle file for production
- Hashing JS & CSS bundles for production
- Cache Busting
- CDN External Dependencies for production
- Static code analysis with Eslint
- Code Formating with Prettier
- Pre-commit hooks with Husky
- Avoid deprecated APIs with React.StrictMode

## 🦉 Possible Improvements

- Unit testing
- Error Boundaries
- Memoization
- List Virtualization
- Older browser support
- Props validation or Typescript
- Better message grouping implementation to group messages sent within 2-3 or more minutes
- Date Tags for dividing messages between days
- Giphy API integration in the backend instead of the frontend
- Responsive design
