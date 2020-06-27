import React, { useState, useEffect } from 'react';
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { Card, Backdrop, CircularProgress } from '@material-ui/core';

import ScheduleActionButtons from './ScheduleActionButtons';
import { saveWorkSchedule, deleteWorkSchedule, getWorkSchedule } from '../../api/ScheduleApi';
import { createWorkingPlan } from '../../utils/WorkScheduleUtils';
import { WorkingDay } from './WorkScheduleDay';
import { DAYS_OF_WEEK } from '../../utils/constants';
import { PlaningDay, PlaningCalendar } from '../../model/Calendar';
import WorkerChips from './WorkerChips';
import ConfirmDialog from '../common/ConfirmDialog';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '93%',
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
    },
    workerDrag: {
      margin: theme.spacing(1),
      justifyContent: 'space-between',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

/**
 * TODO Docme
 */
const WorkSchedule: React.FC<{}> = () => {
  const [spacing] = React.useState<GridSpacing>(2);
  const classes = useStyles();

  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [workPlan, setWorkPlan] = useState<PlaningCalendar>({
    days: [] as PlaningDay[]
  } as PlaningCalendar);

  const [scheduleChanged, setScheduleChanged] = useState(false);
  const [loadedSchedule, setLoadedSchedule] = useState(false);
  const [isEditable, setEditable] = useState(true);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const callApi = async () => {
      setBackdropOpen(backdropOpen => !backdropOpen);
      const loadedSchedule = await getWorkSchedule(parseInt(year), parseInt(month));
      if(!loadedSchedule) {
        setWorkPlan({ days: [] as PlaningDay[] } as PlaningCalendar);
        const newSchedule = createWorkingPlan(parseInt(year), parseInt(month));
        setWorkPlan(newSchedule);
        setLoadedSchedule(false);
      } else {
        setWorkPlan({ days: [] as PlaningDay[] } as PlaningCalendar);
        setWorkPlan(loadedSchedule);
        setLoadedSchedule(true);
      }
      setScheduleChanged(false);
      setBackdropOpen(backdropOpen => !backdropOpen);
    }
    callApi();
  }, [month, year]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newMonth = event.target.value as string
    setMonth(newMonth);
    defineEditability(newMonth, year);
  };

  const defineEditability = (month: string, year: string) => {
    const date = new Date();
    setEditable(parseInt(month) > date.getMonth()
                && parseInt(year) === date.getFullYear());
  }

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newYear = event.target.value as string
    setYear(newYear);
    defineEditability(month, newYear);
  };

  const updateParent = (updatedDay: PlaningDay, index:number) => {
    setWorkPlan(
      update(workPlan, {
        days: {
          [index]: { $set: updatedDay }
        }
      })
    )
    setScheduleChanged(true);
  }

  const handleSave = async () => {
    setBackdropOpen(backdropOpen => !backdropOpen);
    await saveWorkSchedule(workPlan);
    setScheduleChanged(false);
    setLoadedSchedule(true);
    setBackdropOpen(backdropOpen => !backdropOpen);
  }

  const confirmDelete = () => {
    setConfirmOpen(confirmOpen => !confirmOpen);
  }

  const handleDelete = async () => {
    setConfirmOpen(confirmOpen => !confirmOpen);
    setBackdropOpen(backdropOpen => !backdropOpen);
    const result = await deleteWorkSchedule(parseInt(year), parseInt(month));
    setWorkPlan(result);
    setWorkPlan(createWorkingPlan(parseInt(year), parseInt(month)));
    setScheduleChanged(false);
    setLoadedSchedule(false)
    setBackdropOpen(backdropOpen => !backdropOpen);
  }

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
                    isEditable={isEditable}
                    updateParent={(value, index) => updateParent(value, index)} />
                : <Card className={classes.paperGray} />
              }
            </Grid>
          ))}
        </Grid>
      </Grid>
      <ConfirmDialog content="This will delete the current schedule. Do you want to continue?" open={confirmOpen} handleConfirm={handleDelete} handleCancel={() => setConfirmOpen(false)} />
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <WorkerChips isEditable={isEditable} />
      <ScheduleActionButtons key="fab"
              isEditable={isEditable}
              isSaveActive={scheduleChanged}
              isDeleteActive={loadedSchedule}
              handleSave={handleSave}
              handleDelete={confirmDelete} />
    </DndProvider>
  );
}

export default WorkSchedule;
