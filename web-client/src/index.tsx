import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { createBrowserHistory } from 'history'

import { Router, Route } from 'react-router-dom';
import Callback from './auth/Callback';
import { Context, ICognitoAuth, CognitoContext } from './auth/AuthContext';

const history = createBrowserHistory()

const Index = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authData, setAuthData] = useState({} as ICognitoAuth);

  return (
    <Router history={history}>
      <Context.Provider value={{ isAuthenticated, setIsAuthenticated}}>
        <CognitoContext.Provider value={{ authData, setAuthData}}>
          <div>
            <Route
              path="/callback"
              component={Callback}
            />
            <Route
              render={props => {
                return <App />
              }}
            />
          </div>
        </CognitoContext.Provider>
      </Context.Provider>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>,
  document.getElementById('root')
);
