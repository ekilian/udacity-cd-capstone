import React from 'react';
import { BrowserRouter} from 'react-router-dom'
import './App.css';

import Dashboard from './components/dashboard/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Dashboard />
      </div>
    </BrowserRouter>
  );
}

export default App;
