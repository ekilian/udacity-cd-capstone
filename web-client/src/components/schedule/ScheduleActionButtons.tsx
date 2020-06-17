import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Delete, Save } from '@material-ui/icons'
import { Fab, Grid } from '@material-ui/core';

export interface ScheduleActionButtonsProps {
  handleSave: () => void,
  handleDelete: () => void,
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
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

const ScheduleActionButtons: React.FC<ScheduleActionButtonsProps> = ({handleSave, handleDelete}) => {
  const classes = useStyles();

  return (
    <div className={classes.fab}>
      <Grid container direction="column">
        <Grid item>
          <Fab color="primary" aria-label="save" className={classes.margin}
              onClick={handleSave}>
            <Save className={classes.extendedIcon}/>
          </Fab>
        </Grid>
        <Grid item>
          <Fab variant="extended" size="medium" color="secondary" aria-label="delete"
              className={classes.margin} onClick={handleDelete}>
            <Delete className={classes.extendedIcon}/>
            Delete
          </Fab>
        </Grid>
      </Grid>
    </div>
  );

}

export default ScheduleActionButtons;