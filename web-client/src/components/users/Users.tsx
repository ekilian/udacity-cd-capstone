import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, Button, Divider, Grid, Drawer } from '@material-ui/core';
import { TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Save, Delete, Edit, Close, Person, AlternateEmail, PhoneAndroid } from '@material-ui/icons'

import { deleteUser, getUsers, editUser, createUser } from '../../api/users/UsersApi';
import { User } from '../../model/User';
import UserActionButton from './UserActionButton';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paperOffice: {
      height: 250,
      width: 300,
      margin: 10,
      boxShadow: '0px 0px 8px 5px rgba(111, 240, 89, 0.6)',
    },
    paperWorker: {
      height: 250,
      width: 300,
      margin: 10,
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px 5px rgba(89, 142, 222, 0.6)',
    },
    divider: {
      padding: 10,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    drawerPaper: {
      paddingTop: '50px',
      zIndex: 500,
      width: '300px',
      left: 240,
      top: 64,
    },
    textField: {
      paddingBottom: '10px'
    },
  }));

const initUser = {
  username: '',
  given_name: '',
  family_name: '',
  address: '',
  phone_number: '',
  email: '',
  customrole: 'Worker'
} as User;

export default function Employees() {
  const classes = useStyles();

  const [refresh, setRefresh] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(initUser);
  const [editMode, setEditMode] = React.useState(false);
  const [worker, setWorker] = useState({
    list: [] as User[]
  });

  const handleDeleteUser = async (user: User) => {
    const result = await deleteUser(user.username);
    if (result) {
      window.location.reload()
    }
  }

  const handleEditUser = (user: User) => {
    setUser(user);
    setEditMode(true);
    setOpen(true);
  }

  const handleCreateUser = () => {
    setUser(initUser);
    setEditMode(false);
    setOpen(true);
  }

  const handleSave = async (user: User): Promise<void> => {
    if (editMode) {
      await editUser(user);
    } else {
      await createUser(user);
    }
    setRefresh(refresh => refresh + 1);
    setOpen(false);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.name]: value
    });
  }

  const handleClose = () => {
    setUser(initUser);
    setOpen(false);
  }

  useEffect(() => {
    const callApi = async () => {
      const workerArray = await getUsers();
      setWorker({ list: workerArray });
    }
    callApi();
  }, [refresh]);

  return (
    <Grid container xl className={classes.root} direction="row" justify="center">
      <Grid container direction="row">
        {worker.list.map((value) => (
          <Card key={value.username} className={value.customrole === 'Office' ? classes.paperOffice : classes.paperWorker}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                {value.username}
              </Grid>
              <Divider />
              <Grid item>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Person />
                  <p>{value.given_name} {value.family_name}</p>
                </div>
              </Grid>
                <Grid item>
                  <AlternateEmail />{value.email}
                </Grid>
                <Grid item>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <PhoneAndroid />
                    <p>{value.phone_number}</p>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    id="edit"
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Delete />}
                    onClick={() => handleDeleteUser(value)}>
                    Delete
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    id="delete"
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Edit />}
                    onClick={() => handleEditUser(value)}>
                    Edit
                  </Button>
                </Grid>
              </Grid>
          </Card>
        ))}
      </Grid>
          <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: clsx(classes.drawerPaper),
            }}
          >
            <form className={classes.root} noValidate autoComplete="off">
              <Grid container xl spacing={2} direction="column">
                <Grid item>
                  <TextField id="outlined-basic" label="Username" variant="outlined" name="username"
                    InputLabelProps={{ shrink: true }}
                    value={user.username}
                    onChange={handleChange}
                    disabled={editMode}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField id="outlined-basic" label="Surname" variant="outlined" name="given_name"
                    InputLabelProps={{ shrink: true }}
                    value={user.given_name}
                    onChange={handleChange} />
                </Grid>
                <Grid item>
                  <TextField id="outlined-basic" label="Name" variant="outlined" name="family_name"
                    InputLabelProps={{ shrink: true }}
                    value={user.family_name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField id="outlined-basic" label="E-Mail" variant="outlined" name="email"
                    InputLabelProps={{ shrink: true }}
                    value={user.email}
                    disabled={editMode}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField id="outlined-basic" label="Phone number" variant="outlined"
                    name="phone_number" InputLabelProps={{ shrink: true }}
                    value={user.phone_number}
                    onChange={handleChange} />
                </Grid>
                <Grid container direction="row" justify="center">
                  <Grid item>
                    <RadioGroup aria-label="role" name="customrole" value={user.customrole} onChange={handleChange} row>
                      <FormControlLabel value="Office" control={<Radio />} label="Office" />
                      <FormControlLabel value="Worker" control={<Radio />} label="Worker" />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container direction="row" spacing={3} justify="center">
                <Grid item>
                    <Button
                      id="create"
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<Save />}
                      onClick={() => handleSave(user)}
                    >
                      Save
                </Button>
                </Grid>
                <Grid item>
                  <Button
                    id="cancel"
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Close />}
                    onClick={() => handleClose()}
                  >
                      Cancel
                </Button>
                </Grid>
              </Grid>
            </form>
          </Drawer>
          <UserActionButton isActive={!open} handleCreate={() => handleCreateUser()} />
    </Grid>
  )
}
