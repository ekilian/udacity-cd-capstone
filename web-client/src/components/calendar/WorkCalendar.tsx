import React, { useCallback, useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { createWorkingPlan } from '../../utils/CalendarUtils';
import { WorkingDay } from './CalendarDay';
import { DAYS_OF_WEEK } from '../../utils/constants';
import { DraggableWorker } from './DraggableWorker';
import { PlaningDay } from '../../model/Calendar';
import { ItemTypes } from '../../utils/ItemTypes';
import { Card } from '@material-ui/core';
import update from 'immutability-helper'

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

  // TODO: Init with current month
  let [month, setMonth] = React.useState('6');
  let [year, setYear] = React.useState('2020');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newMonth = event.target.value as string
    setMonth(newMonth);
    setWorkDays(createWorkingPlan(parseInt(year), parseInt(newMonth)).days);
  };

  const workPlan = createWorkingPlan(parseInt(year), parseInt(month));
  const [workDays, setWorkDays] = useState<PlaningDay[]>(workPlan.days);

  const handleDrop = useCallback((index: number, item: any) => {
    setWorkDays(
      update(workDays, {
        [index]: {
          afternoon: { $push: [item.name]}
        }
      }
    ))
    console.log(workDays);
    }, [workDays]
  )

  //TODO: Search flex grid with constant items per line
  return (
    <Grid container xl className={classes.root} spacing={2}>
      <Grid item xl={1}>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Month</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            onChange={handleChange}
          >
            <MenuItem key={1} value={1}>Enero</MenuItem>
            <MenuItem key={2} value={2}>Febrero</MenuItem>
            <MenuItem key={3} value={3}>Enero</MenuItem>
            <MenuItem key={4} value={4}>Enero</MenuItem>
            <MenuItem key={5} value={5}>Enero</MenuItem>
            <MenuItem key={6} value={6}>Junio</MenuItem>
            <MenuItem key={7} value={7}>Julio</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xl={1}>
        <DraggableWorker name="Gloria" id={1} type={ItemTypes.WORKER}/>
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
        {workDays.map((value, index) => (

          <Grid key={index} item>
            { value.active
              ? <WorkingDay active={value.active} day={value}
                            onDrop={(item) => handleDrop(value.day, item)} />
              : <Card className={classes.paperGray} />
            }
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
