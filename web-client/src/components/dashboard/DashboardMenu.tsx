import React from 'react';
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';


export const DashboardMenu: React.FC<{}> = () => {
  return (
    <List >
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      {scheduleLink()}
      {/* TODO: Rechte */}
      {reportLink()}
      {usersLink()}
      <Divider />
    </List>
  );
}

const scheduleLink = () => {
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
  return (
    <ListItem button component={Link} to="/employees">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Employees" />
    </ListItem>
  )
}

const reportLink = () => {
  return (
    <ListItem button component={Link} to="/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Work Reports" />
    </ListItem>
  )
}
