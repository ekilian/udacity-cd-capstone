import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import { List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { ListSubheader } from '@material-ui/core';


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

      {usersLink()}
      <Divider />
      <List>
        <SubMenu />
      </List>
    </List>
  );
}

const SubMenu: React.FC<{}> = () => {
  const location = useLocation();

  if (location.pathname === '/employees'
      || location.pathname === '/edituser') {
    return (
      <div>
        <ListSubheader>Employees</ListSubheader>
        <ListItem button component={Link} to="/edituser">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Create User" />
        </ListItem>
      </div>
    )
  } else {
    return (
      <div />
    );
  }
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
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Work Reports" />
    </ListItem>
  )
}
