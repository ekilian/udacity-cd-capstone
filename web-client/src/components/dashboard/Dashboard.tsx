import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { DashboardMenu } from './DashboardMenu';
import {Lock, LockOpenRounded} from '@material-ui/icons'

import WorkSchedule from '../schedule/WorkSchedule';
import Users from '../users/Users';
import { IAuthContext, useAuthContext } from '../../auth/AuthContext';
import SimpleBarChart from '../reports/Reports';
import Login from '../../auth/Login';

import { useDashboardStyles } from './DashboardStyles';
import { requireAuth } from '../../auth/AuthUtils';


export default function Dashboard() {
  const history = useHistory();
  const classes = useDashboardStyles();
  const authContext:IAuthContext = useAuthContext();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogin = () => {
    if(authContext.isAuthenticated) {
      return handleLogout();
    }
    history.push("/login")
  }

  function handleLogout() {
    authContext.setIsAuthenticated(false);
    history.push("/");
  }

  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              &nbsp;
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleLogin}>
              {authContext.isAuthenticated
                ? <LockOpenRounded />
                : <Lock />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <DashboardMenu />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.container}>
            <Switch>
              <Route exact path="/schedule" component={WorkSchedule} />
              <Route exact path="/users" component={Users} />
              <Route exact path="/reports" component={SimpleBarChart} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Container>
        </main>
      </div>
  );
}
