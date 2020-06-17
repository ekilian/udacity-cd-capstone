import React, { useState, useEffect } from 'react';
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
import ScheduleActionButtons from './ScheduleActionButtons';
import { saveWorkSchedule, deleteWorkSchedule, getWorkSchedule } from '../../api/users/ScheduleApi';

import { v4 as uuid } from 'uuid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '90%',
    },
    item: {
      flexGrow: 1,
      flexBasis: '13%',
    },
    paperHeadline: {
      height: 30,
      marginBottom: 10,
    },
    paper: {
      height: 150,
      width: 'auto',
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
      height: '100%',
      width: 'auto',
      backgroundColor: '#364150',
    }
  }),
);

const WorkSchedule: React.FC<{}> = () => {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const currentMonth = new Date().getMonth()+1;
  const currentYear = new Date().getFullYear();

  const [worker, setWorker] = useState({list: [] as User[]});
  const [month, setMonth] = useState(currentMonth.toString());
  const [year, setYear] = useState(currentYear.toString());
  const [workPlan, setWorkPlan] = useState<PlaningCalendar>({
    days: [] as PlaningDay[]
  } as PlaningCalendar);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newMonth = event.target.value as string
    setMonth(newMonth);
  };

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newYear = event.target.value as string
    setYear(newYear);
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

  const handleSave = async () => {
    await saveWorkSchedule(workPlan);
  }

  const handleDelete = async () => {
    await deleteWorkSchedule(parseInt(year), parseInt(month));
  }

  useEffect(() => {
    const callApi = async () => {
      const workerArray = await getUsers();
      setWorker({ list: workerArray });
    }
    callApi();
  }, []);

  useEffect(() => {
    const callApi = async () => {
      const loadedSchedule = await getWorkSchedule(parseInt(year), parseInt(month));
      if(!loadedSchedule) {
        setWorkPlan({ days: [] as PlaningDay[] } as PlaningCalendar);
        const newSchedule = createWorkingPlan(parseInt(year), parseInt(month));
        setWorkPlan(newSchedule);
      } else {
        setWorkPlan({ days: [] as PlaningDay[] } as PlaningCalendar)
        setWorkPlan(loadedSchedule);
      }
    }
    callApi();
  }, [month, year]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container className={classes.root} spacing={3}>
        <Grid item sm={2}>
          <FormControl className={classes.formControl}>
            <InputLabel id="month-label">Month</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
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
        <Grid item sm={2}>
          <FormControl className={classes.formControl}>
            <InputLabel id="year-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={year}
              onChange={handleYearChange}
            >
              <MenuItem key={1} value={2020}>2020</MenuItem>
              <MenuItem key={2} value={2021}>2021</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={4}>
          {worker.list.map((value) => (
            <DraggableWorker key={uuid()} name={value.nickname} type={ItemTypes.WORKER} isDropped={false}/>
          ))}
        </Grid>
        {/* Headline */}
        <Grid container spacing={spacing}>
          {DAYS_OF_WEEK.map((value) => (
            <Grid item key={value} className={classes.item}>
              <Paper className={classes.paperHeadline}>
                <span>{value}</span>
              </Paper>
            </Grid>
          ))}
        </Grid>
        {/* Calendar */}
        <Grid container spacing={spacing}>
          {workPlan.days.map((value, index) => (
            <Grid key={index} item className={classes.item}>
              {value.active
                ? <WorkingDay index={index} day={value}
                  updateParent={(value, index) => updateParent(value, index)} />
                : <Card className={classes.paperGray} />
              }
            </Grid>
          ))}
        </Grid>
        <ScheduleActionButtons handleSave={handleSave} handleDelete={handleDelete} />
      </Grid>
    </DndProvider>
  );
}

export default WorkSchedule;
