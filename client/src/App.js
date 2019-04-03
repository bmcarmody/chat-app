import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import io from 'socket.io-client';

import SocketContext from './store/socket-context';

import Login from './components/Login';

const endpoint = 'http://localhost:5000';
const socket = io(endpoint);

const App = () => {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Route path="/" exact component={Login} />
      </Router>
    </SocketContext.Provider>
  );
};

export default App;
