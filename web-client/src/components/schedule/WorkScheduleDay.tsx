import React, { FunctionComponent, useEffect, useState } from 'react';
import update from 'immutability-helper'
import { useDrop } from 'react-dnd';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Card } from '@material-ui/core';

import { PlaningDay } from '../../model/Calendar';
import { DraggableWorker, DraggableWorkerProps } from './DraggableWorker';
import { ItemTypes } from '../../utils/ItemTypes';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      flexWrap: 'nowrap',
      width: '100%',
    },
    paper: {
      height: 200,
      width: 200,
    },
    paperGray: {
      height: 200,
      width: 200,
      backgroundColor: '#364150',
    },
    subPaper: {
      height: 60,
    },
  }),
);

export interface PlaningDayProps {
  index:number
  day: PlaningDay,
  updateParent: (updatedDay:PlaningDay, index:number) => void,
}

export const WorkingDay: FunctionComponent<PlaningDayProps> = (props) => {
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
    props.updateParent(planingDay, props.index);
  }, [planingDay]);


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
      <div ref={dropMorning} className={classes.subPaper}>
        {planingDay.morning.map((value, index) => (
          <DraggableWorker name={value} type={ItemTypes.WORKER} isDropped={true} onDelete={() => handleDelete(value, 'morning')} />
        ))}
      </div>
      <Divider />
      <div ref={dropAfternoon} className={classes.subPaper}>
        {planingDay.afternoon.map((value, index) => (
          <DraggableWorker name={value} type={ItemTypes.WORKER} isDropped={true} onDelete={() => handleDelete(value, 'afternoon')} />
        ))}
      </div>
      <Divider />
      <div ref={dropNight} className={classes.subPaper}>
        {planingDay.night.map((value, index) => (
          <DraggableWorker name={value} type={ItemTypes.WORKER} isDropped={true} onDelete={() => handleDelete(value, 'night')} />
        ))}
      </div>
    </Card>
  );
}
