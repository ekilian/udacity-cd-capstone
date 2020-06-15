import React, { FunctionComponent } from 'react';
import { Grid, TextField, makeStyles, Theme, createStyles, MenuItem, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { createUser } from '../../api/users/UsersApi';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(2),
        width: '75%',
      },
    },
  }),
);

export const EditUser: FunctionComponent<EditUserProps> = () => {
  const history = useHistory();
  const initEditUserProps:EditUserProps = {} as EditUserProps;
  initEditUserProps.custom = {
    role: 'Worker'
  } as CustomEditUser;

  const [createdUser, setCreatedUser] = React.useState<EditUserProps>(initEditUserProps)
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date('2014-08-18'),
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCreatedUser({
      ...createdUser,
      [event.target.name]: value
    });
  }

  const handleCreateUser = async (event: React.MouseEvent<HTMLButtonElement>):Promise<void> => {
    const result = await createUser(createdUser);
    if(result) {
      history.push('employees')
    }
  }

  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth
            name="username"
            onChange={handleChange} />
        </Grid>
        <Grid item>
          <TextField id="outlined-basic" label="Surname" variant="outlined"
            name="given_name"
            onChange={handleChange} />
          <TextField id="outlined-basic" label="Name" variant="outlined"
            name="family_name"
            onChange={handleChange} />
        </Grid>
        <Grid item>
          <TextField id="outlined-basic" label="E-Mail" variant="outlined"
            name="email"
            onChange={handleChange} />
        </Grid>
        <Grid item>
          <TextField id="outlined-basic" label="Phone number" variant="outlined"
            name="phone_number"
            onChange={handleChange} />
        </Grid>
        <Grid item>
          <TextField id="outlined-basic" label="Address" variant="outlined"
            name="address"
            onChange={handleChange} />
        </Grid>
        <Grid item>
          <TextField
            id="outlined-select-currency"
            name="role"
            select
            label="Select"
            value={createdUser.custom.role}
            onChange={handleChange}
            variant="outlined"
          >
            {ROLE_TYPES.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button
            id="create"
            variant="contained"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={handleCreateUser}
          >
            Create User
          </Button>
        </Grid>
      </Grid >
    </form>
  );
}

const ROLE_TYPES = [
  {
    value: 'Admin',
    label: 'Administrator',
  },
  {
    value: 'Office',
    label: 'Office',
  },
  {
    value: 'Worker',
    label: 'Worker',
  }
];

export interface EditUserProps {
  username: string,
  given_name: string,
  family_name: string,
  email: string,
  phone_number: string,
  address: string,
  birthdate: string,
  custom: CustomEditUser
}

export interface CustomEditUser {
  role: string
}