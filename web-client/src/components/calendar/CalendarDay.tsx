import React, { FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { Card } from '@material-ui/core';
import { useDrop } from 'react-dnd';
import { PlaningDay } from '../../model/Calendar';
import { DraggableWorker } from './DraggableWorker';
import { ItemTypes } from '../../utils/ItemTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
  active: boolean,
  day: PlaningDay,
  onDrop: (item: any) => void
}

export const WorkingDay: FunctionComponent<PlaningDayProps> = (props) => {


  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Worker',
    drop: props.onDrop,
  })
  const classes = useStyles();
  return (
    <Card ref={drop} className={props.active ? classes.paper : classes.paperGray}>
      <span>{props.day.day}</span>
      <Divider />
      <div className={classes.subPaper}>
        &nbsp;
      </div>
      <Divider />
      <div className={classes.subPaper}>
        {props.day.afternoon.map((value) => (
          <div>
            <DraggableWorker name={value} id={1} type={ItemTypes.WORKER}/>
          </div>
        ))}
      </div>
      <Divider />
      <div className={classes.subPaper}>
        &nbsp;
        </div>
    </Card>
  );
}