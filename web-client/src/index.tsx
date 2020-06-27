import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { createBrowserHistory } from 'history'

import { Router } from 'react-router-dom';
import { Context } from './auth/AuthContext';
import Amplify from 'aws-amplify';
import config from './config';

const history = createBrowserHistory()

const Index = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router history={history}>
      <Context.Provider value={{ isAuthenticated, setIsAuthenticated}}>
          <div>
            <App />
          </div>
      </Context.Provider>
    </Router>
  )
}

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
