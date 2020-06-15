import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Card, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { deleteUser, getUsers } from '../../api/users/UsersApi';
import { User } from '../../model/User';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    paper: {
      height: 250,
      width: 300,
      margin: 10,
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05) inset, 0px 0px 8px rgba(82, 168, 236, 0.6)',
    },
    divider: {
      padding: 10,
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  })
);


export default function Employees() {
  const history = useHistory();
  const [worker, setWorker] = useState({
    list: [] as User[]
  });

  useEffect(() => {
    const callApi = async () => {
      const workerArray = await getUsers();
      setWorker({ list: workerArray });
    }
    callApi();
  }, []);

  const handleDeleteUser = async (user:User) => {
    const result = await deleteUser(user.username);
    if(result) {
      window.location.reload() //.push('employees')
    }
  }

  const handleEditUser = (username:string) => {

  }

  const classes = useStyles();

  return (
    <Grid container xl className={classes.root}>
      <Grid container spacing={3} justify="center">
        {worker.list.map((value) => (
          <Card className={classes.paper}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                {value.nickname}
              </Grid>
              <Grid item>
                {value.name}, {value.surname}
              </Grid>
              <Grid item>
                {value.address}
              </Grid>
              <Grid item>
                {value.phone}
              </Grid>
              <Grid item>
                {value.birthdate}
              </Grid>
              <Divider />
              <Grid container spacing={2} justify="center" alignItems="flex-end">
                <Grid item>
                  <Button
                    id="edit"
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteUser(value)}
                  >
                    Delete
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    id="delete"
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={(value) => handleEditUser}
                  >
                    Edit
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Grid>
    </Grid>
  )
}
