import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './Layout';
import JoinChat from './pages/JoinChat/JoinChat';
import ChatRoom from './pages/ChatRoom/ChatRoom';

const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/join" exact component={JoinChat} />
        <Route path="/chat" exact component={ChatRoom} />
        <Redirect to="/join" />
      </Switch>
    </Layout>
  );
};

export default App;
