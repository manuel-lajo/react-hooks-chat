import React from 'react';
import ReactDOM from 'react-dom';
import { UsernameProvider } from './contexts/UsernameContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './assets/stylesheets/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <UsernameProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UsernameProvider>
  </React.StrictMode>,
  document.getElementById('app'),
);
