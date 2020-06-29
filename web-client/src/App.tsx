import React from 'react';
import { BrowserRouter} from 'react-router-dom'
import './App.css';

import Dashboard from './components/dashboard/Dashboard';
import config from './config';


function App() {
  console.log(config)
  return (
    <BrowserRouter>
      <div className="App">
          <Dashboard />
      </div>
    </BrowserRouter>
  );
}

export default App;
