import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import update from 'immutability-helper'
import { useDrop } from 'react-dnd';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Card } from '@material-ui/core';

import { PlaningDay } from '../../model/Calendar';
import { DraggableWorker, DraggableWorkerProps } from './DraggableWorker';
import { ItemTypes } from '../../utils/ItemTypes';
import { v4 as uuid } from 'uuid';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      flexWrap: 'nowrap',
      width: '100%',
    },
    paper: {
      display: 'inline-flex',
      flexDirection: 'column',
      width: '100%',
      padding: '3px',
    },
    subPaper: {
      height: '60px',
      display: 'inline-flex',
      flexDirection: 'column',
      padding: '3px',
    },
  }),
);

export interface PlaningDayProps {
  index:number
  day: PlaningDay,
  isEditable: boolean,
  updateParent: (updatedDay:PlaningDay, index:number) => void,
}

export const WorkingDay: FunctionComponent<PlaningDayProps> = (props) => {
  const firstUpdate = useRef(true);
  const [planingDay, setPlaningDay] = useState(props.day);

  const [{}, dropMorning] = useDrop({
    accept: 'Worker',
    drop: (item) => handleDrop(item, 'morning'),
    canDrop: function(props, monitor) {
      const prop = props as DraggableWorkerProps;
      if(planingDay.morning.indexOf(prop.name) > -1) {
        return false;
      }
      return true;
    }
  })

  const [{}, dropAfternoon] = useDrop({
    accept: 'Worker',
    drop: (item) => handleDrop(item, 'afternoon'),
    canDrop: function(props, monitor) {
      const proper = props as DraggableWorkerProps;
      if(planingDay.afternoon.indexOf(proper.name) > -1) {
        return false;
      }
      return true;
    }
  });

  const [{}, dropNight] = useDrop({
    accept: 'Worker',
    drop: (item) => handleDrop(item, 'night'),
    canDrop: function(props, monitor) {
      const proper = props as DraggableWorkerProps;
      if(planingDay.night.indexOf(proper.name) > -1) {
        return false;
      }
      return true;
    }
  });

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    props.updateParent(planingDay, props.index);
  }, [planingDay])

  const handleDrop = (item: any, target: string) => {
    if (target === 'morning') {
      setPlaningDay(
        update(planingDay, {
          morning: { $push: [item.name] }
        })
      );
    }
    if (target === 'afternoon') {
      setPlaningDay(
        update(planingDay, {
          afternoon: { $push: [item.name] }
        })
      );
    }
    if (target === 'night') {
      setPlaningDay(
        update(planingDay, {
          night: { $push: [item.name] }
        })
      );
    }
  };

  const handleDelete = (userToRemove:string, target:string) => {
    if (target === 'morning') {
      setPlaningDay(
        update(planingDay, {
          morning: { $splice: [[planingDay.morning.indexOf(userToRemove), 1]] }
        })
      );
    }
    if (target === 'afternoon') {
      setPlaningDay(
        update(planingDay, {
          afternoon: { $splice: [[planingDay.afternoon.indexOf(userToRemove), 1]] }
        })
      );
    }
    if (target === 'night') {
      setPlaningDay(
        update(planingDay, {
          night: { $splice: [[planingDay.night.indexOf(userToRemove), 1]] }
        })
      );
    }
  }

  const classes = useStyles();
  return (
    <Card  className={classes.paper}>
      <span>{props.day.day}</span>
      <Divider />
      <div ref={dropMorning} className={classes.paper}>
        <div className={classes.subPaper}>
        {planingDay.morning.map((value) => (
          <DraggableWorker key={uuid()} name={value} type={ItemTypes.WORKER} isDropped={true}
                          isEditable={props.isEditable}
                          onDelete={(value) => handleDelete(value, 'morning')} />
        ))}
        </div>
      </div>
      <Divider />
      <div ref={dropAfternoon} className={classes.paper}>
       <div className={classes.subPaper}>
        {planingDay.afternoon.map((value) => (
          <DraggableWorker key={uuid()} name={value} type={ItemTypes.WORKER} isDropped={true}
                            isEditable={props.isEditable}
                            onDelete={(value) => handleDelete(value, 'afternoon')} />
        ))}
        </div>
      </div>
      <Divider />
      <div ref={dropNight} className={classes.paper}>
       <div className={classes.subPaper}>
        {planingDay.night.map((value) => (
          <DraggableWorker key={uuid()} name={value} type={ItemTypes.WORKER} isDropped={true}
                          isEditable={props.isEditable}
                          onDelete={(value) => handleDelete(value, 'night')} />
        ))}
        </div>
      </div>
    </Card>
  );
}
