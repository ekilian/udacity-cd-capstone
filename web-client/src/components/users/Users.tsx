import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Grid, Slide, Backdrop, CircularProgress } from '@material-ui/core';
import { TextField, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { Save, Edit, Close} from '@material-ui/icons'

import { deleteUser, getUsers, editUser, createUser } from '../../api/UsersApi';
import { User } from '../../model/User';
import UserActionButton from './UserActionButton';

import { IAuthContext, useAuthContext } from '../../auth/AuthContext';
import { useStyles } from './UsersStyles';
import { validateUsername } from './UsersValidation';
import UsersGrid from './UsersGrid';


const initUser = {
  username: '',
  password: '',
  given_name: '',
  family_name: '',
  address: '',
  phone_number: '+51',
  email: '',
  customrole: 'Worker',
  customimageUrl: ''
} as User;

export interface UserFileProp {
  selectedFile:any
}

export const Users: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const authContext:IAuthContext = useAuthContext();
  const [refresh, setRefresh] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [backdropOpen, setBackdrop] = React.useState(false);
  const [user, setUser] = React.useState(initUser);
  const [file, setFile] = React.useState({} as UserFileProp);
  const [editMode, setEditMode] = React.useState(false);
  const [worker, setWorker] = useState({list: [] as User[]});
  const [usernameValidation, setUsernameValidation] = React.useState('');

  useEffect(() => {
    if(!authContext.isAuthenticated) {
      history.push("/login");
      return
    }
    const callApi = async () => {
      setBackdrop(true);
      const workerArray = await getUsers(true);
      setWorker({ list: workerArray});
      setBackdrop(false);
    }
    callApi();
  }, [refresh]);

  const handleDeleteUser = async (user: User) => {
    const result = await deleteUser(user.username);
    if (result) {
      history.push("/users")
    }
  }

  const handleEditUser = (user: User) => {
    setUser(user);
    setEditMode(true);
    setOpen(true);
  }

  const handleCreateUser = () => {
    console.log(initUser)
    setUser(initUser);
    setEditMode(false);
    setOpen(true);
  }

  const handleSave = async (user: User): Promise<void> => {
    setBackdrop(true);
    if (editMode) {
      await editUser(user, file.selectedFile);
    } else {
      await createUser(user);
    }
    setRefresh(refresh => refresh + 1);
    setOpen(false);
    setBackdrop(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if(event.target.name === 'username') {
      if(validateUsername(worker.list, event.target.value)) {
        setUsernameValidation("Username already exists")
      } else {
        setUsernameValidation("")
      }
    }
    setUser({
      ...user,
      [event.target.name]: value
    });
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFile;
    if(event.target.files) {
      selectedFile = event.target.files[0];
    }
    setFile({
      ...file,
      selectedFile
    });
  }

  const handleClose = () => {
    setUser(initUser);
    setOpen(false);
  }


  return (
    <Grid container direction="row" justify="center">
      <Grid container direction="column" className={open ? classes.drawerFormOpen : classes.drawerFormClose} alignItems="stretch">
        <Slide direction="right" in={open} mountOnEnter unmountOnExit>
          <div>
            <form noValidate autoComplete="off">
              <Grid container xl spacing={2} direction="column">
                <Grid item>
                  <TextField id="username" label="Username" variant="outlined" name="username" autoComplete="new-username" fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={user.username}
                    onChange={handleChange}
                    disabled={editMode}
                    required
                    helperText={usernameValidation}
                    error={usernameValidation !== ''}
                  />
                </Grid>
                <Grid item>
                  <TextField id="password" label="Password" variant="outlined" name="password" autoComplete="new-password" fullWidth
                    type="password"
                    InputLabelProps={{ shrink: true }}
                    value={user.password}
                    onChange={handleChange}
                    disabled={editMode}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField id="surname" label="Surname" variant="outlined" name="given_name" fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ maxLength: 25 }}
                    value={user.given_name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField id="name" label="Name" variant="outlined" name="family_name" fullWidth
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ maxLength: 25 }}
                    value={user.family_name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField id="email" label="E-Mail" variant="outlined" name="email" fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={user.email}
                    disabled={editMode}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField id="phone" label="Phone number" variant="outlined" name="phone_number" fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={user.phone_number}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item>
                  <TextField id="image" label="Image" variant="outlined" fullWidth
                    name="customimageUrl" InputLabelProps={{ shrink: true }}
                    type="file"
                    value={user.customimageUrl}
                    onChange={handleFileChange} />
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
                    onClick={() => handleClose()}>
                      Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Slide>
      </Grid>
      <UsersGrid workers={worker.list} handleDeleteUser={handleDeleteUser} handleEditUser={handleEditUser} />
      <UserActionButton isActive={!open} handleCreate={() => handleCreateUser()} />
      <Backdrop className={classes.backdrop} open={backdropOpen} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  )
}

export default Users;
