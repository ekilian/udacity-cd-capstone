import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Save } from '@material-ui/icons'
import { Fab, Grid } from '@material-ui/core';

export interface UserActionButtonProps {
  isActive:boolean,
  handleCreate: () => void,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: 0,
      top: 'auto',
      left: 'auto',
      bottom: 20,
      right: 20,
      position: 'fixed',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const UserActionButton: React.FC<UserActionButtonProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.fab} >
      <Grid container direction="column">
        <Grid item>
          <Fab color="primary" aria-label="create"
              className={classes.margin}
              onClick={props.handleCreate}
              disabled={!props.isActive}>
            <Save />
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserActionButton;