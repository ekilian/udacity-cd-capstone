import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import { v4 as uuid } from 'uuid';

import { DraggableWorker } from './DraggableWorker';
import { ItemTypes } from '../../utils/ItemTypes';
import { getUsers } from '../../api/users/UsersApi';
import { User } from '../../model/User';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: 0,
      top: 100,
      left: 'auto',
      bottom: 'auto',
      right: 25,
      position: 'fixed',
    }
  }),
);

const WorkerChips: React.FC<{}> = () => {
  const classes = useStyles();

  const [worker, setWorker] = useState({list: [] as User[]});

  useEffect(() => {
    const callApi = async () => {
      const workerArray = await getUsers();
      setWorker({ list: workerArray });
    }
    callApi();
  }, []);

  return (
    <div className={classes.fab} >
      {worker.list.map((value) => (
        <DraggableWorker key={uuid()} name={value.nickname} type={ItemTypes.WORKER} isDropped={false}/>
      ))}
    </div>
  );
}

export default WorkerChips;