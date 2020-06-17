import React, { useState } from 'react';
import { BrowserRouter} from 'react-router-dom'
import './App.css';

import Dashboard from './components/dashboard/Dashboard';
import { AppContext } from './context/context';


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Dashboard />
        </AppContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
