import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { DraggableWorker } from './DraggableWorker';
import { User } from '../../model/User';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: 0,
      top: 165,
      left: 'auto',
      bottom: 'auto',
      right: 35,
      position: 'fixed',
    }
  }),
);

export interface WorkerChipsProps {
  isEditable:boolean,
  workers:User[]
}

const WorkerChips: React.FC<WorkerChipsProps> = (props) => {
  const classes = useStyles();

  if(props.isEditable) {
    return (
      <div className={classes.fab} >
        {props.workers.map((value) => (
          <DraggableWorker key={value.id} user={value} isDropped={false} isEditable={true}/>
        ))}
      </div>
    );
  } else {
    return (
      <div></div>
    );
  }
}

export default WorkerChips;