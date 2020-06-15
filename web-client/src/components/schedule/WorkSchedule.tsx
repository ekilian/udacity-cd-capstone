import React, { useCallback, useState, useEffect } from 'react';
import update from 'immutability-helper'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { createWorkingPlan } from '../../utils/WorkScheduleUtils';
import { WorkingDay } from './WorkScheduleDay';
import { DAYS_OF_WEEK } from '../../utils/constants';
import { DraggableWorker } from './DraggableWorker';
import { PlaningDay, PlaningCalendar } from '../../model/Calendar';
import { ItemTypes } from '../../utils/ItemTypes';
import { Card } from '@material-ui/core';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getUsers } from '../../api/users/UsersApi';
import { User } from '../../model/User';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100%',
    },
    paperHeadline: {
      height: 30,
      width: 200,
      marginBottom: 10,
    },
    paper: {
      height: 200,
      width: 200,
    },
    control: {
      padding: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    paperGray: {
      height: 200,
      width: 200,
      backgroundColor: '#364150',
    }
  }),
);

export default function WorkCalendar() {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const [worker, setWorker] = useState({
    list: [] as User[]
  });
  // TODO: Init with current month
  let [month, setMonth] = React.useState('6');
  let [year, setYear] = React.useState('2020');

  const loadedPlan = createWorkingPlan(parseInt(year), parseInt(month));
  const [workPlan, setWorkPlan] = useState<PlaningCalendar>(loadedPlan);

  useEffect(() => {
    const callApi = async () => {
      const workerArray = await getUsers();
      setWorker({ list: workerArray });
    }
    callApi();
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newMonth = event.target.value as string
    setMonth(newMonth);
    setWorkPlan(createWorkingPlan(parseInt(year), parseInt(newMonth)));
  };

  const updateParent = (updatedDay: PlaningDay, index:number) => {
    setWorkPlan(
      update(workPlan, {
        days: {
          [index]: { $set: updatedDay }
        }
      })
    )
  }

  //TODO: Search flex grid with constant items per line
  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container xl className={classes.root} spacing={3}>
        <Grid item md={2}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Month</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={month}
              onChange={handleChange}
            >
              <MenuItem key={1} value={1}>January</MenuItem>
              <MenuItem key={2} value={2}>February</MenuItem>
              <MenuItem key={3} value={3}>March</MenuItem>
              <MenuItem key={4} value={4}>April</MenuItem>
              <MenuItem key={5} value={5}>May</MenuItem>
              <MenuItem key={6} value={6}>June</MenuItem>
              <MenuItem key={7} value={7}>July</MenuItem>
              <MenuItem key={8} value={8}>August</MenuItem>
              <MenuItem key={9} value={9}>September</MenuItem>
              <MenuItem key={10} value={10}>October</MenuItem>
              <MenuItem key={11} value={11}>November</MenuItem>
              <MenuItem key={12} value={12}>December</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={2}>
          {worker.list.map((value) => (
            <DraggableWorker name={value.nickname} type={ItemTypes.WORKER} isDropped={false}/>
          ))}
        </Grid>
        {/* Headline */}
        <Grid container spacing={spacing}>
          {DAYS_OF_WEEK.map((value) => (
            <Grid key={value} item >
              <Paper className={classes.paperHeadline}>
                <span>{value}</span>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Calendar */}
        <Grid container spacing={spacing}>
          {workPlan.days.map((value, index) => (
            <Grid key={index} item>
              {value.active
                ? <WorkingDay index={index} day={value}
                  updateParent={() => updateParent(value, index)} />
                : <Card className={classes.paperGray} />
              }
            </Grid>
          ))}
        </Grid>
      </Grid>
    </DndProvider>
  );
}
