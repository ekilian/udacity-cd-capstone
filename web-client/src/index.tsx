import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history'

import { Router, Route } from 'react-router-dom';
import Callback from './auth/Callback';

const history = createBrowserHistory()

ReactDOM.render(
  <React.StrictMode>
      <Router history={history}>
        <div>
          <Route
            path="/authcallback"
            component={Callback}
          />
          <Route
            render={props => {
              return <App />
            }}
          />
        </div>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
