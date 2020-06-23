import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { v4 as uuid } from 'uuid';

import { DraggableWorker } from './DraggableWorker';
import { ItemTypes } from '../../utils/ItemTypes';
import { getUsers } from '../../api/UsersApi';
import { User } from '../../model/User';
import { useCognitoContext, ICognitoAuth } from '../../auth/AuthContext';


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
  isEditable:boolean
}

const WorkerChips: React.FC<WorkerChipsProps> = (props) => {
  const classes = useStyles();
  const cognitoContext:ICognitoAuth = useCognitoContext();

  const [worker, setWorker] = useState({list: [] as User[]});
  useEffect(() => {
    const callApi = async () => {
      const userArray = await getUsers(cognitoContext.authData.id_token);
      let workerArray:User[] = [];
      userArray.forEach((element) => {
        if(element.customrole === 'Worker') {
          workerArray.push(element);
        }
      });
      setWorker({ list: workerArray });
    }
    callApi();
  }, []);

  if(props.isEditable) {
    return (
      <div className={classes.fab} >
        {worker.list.map((value) => (
          <DraggableWorker key={uuid()} name={value.username} type={ItemTypes.WORKER} isDropped={false} isEditable={true}/>
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