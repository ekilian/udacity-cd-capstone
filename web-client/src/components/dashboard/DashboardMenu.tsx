import React from 'react';
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';

import { IAuthContext, useAuthContext } from '../../auth/AuthContext';


export const DashboardMenu: React.FC<{}> = () => {
  const authContext:IAuthContext = useAuthContext();

  const scheduleLink = () => {
    if(!authContext.isAuthenticated) {
      return null;
    }

    return (
      <ListItem button component={Link} to="/schedule">
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText primary="Work schedule" />
      </ListItem>
    )
  }

  const usersLink = () => {
    if(!authContext.isAuthenticated) {
      return null;
    }

    return (
      <ListItem button component={Link} to="/users">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Employees" />
      </ListItem>
    )
  }

  const reportLink = () => {
    if(!authContext.isAuthenticated) {
      return null;
    }

    return (
      <ListItem button component={Link} to="/reports">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Work Reports" />
      </ListItem>
    )
  }

  return (
    <List >
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      {scheduleLink()}
      {reportLink()}
      {usersLink()}
    </List>
  );
}






