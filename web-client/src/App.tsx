import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import Dashboard from './components/dashboard/Dashboard';
import Employees from './components/employees/Employees';
import WorkCalendar from './components/calendar/WorkCalendar';


function App() {
  return (
    <div className="App">
      <Dashboard />

      <Switch>
        <Route exact path="/workcalendar" component={WorkCalendar} />
        <Route exact path="/employees" component={Employees} />
      </Switch>
    </div>
  );
}

export default App;
