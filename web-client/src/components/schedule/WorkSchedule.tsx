import React, { useState, useEffect, useRef} from 'react';
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Card, Backdrop, CircularProgress, Button } from '@material-ui/core';

import ScheduleActionButtons from './ScheduleActionButtons';
import { saveWorkSchedule, deleteWorkSchedule, getWorkSchedule } from '../../api/ScheduleApi';
import { createWorkingPlan, DAYS_OF_WEEK } from '../../utils/WorkScheduleUtils';
import { WorkingDay } from './WorkScheduleDay';
import { PlaningDay, PlaningCalendar } from '../../model/Calendar';
import WorkerChips from './WorkerChips';
import ConfirmDialog from '../common/ConfirmDialog';
import SelectYearMonth from '../common/SelectYearMonth';
import { getUsers } from '../../api/UsersApi';
import { User } from '../../model/User';
import { IAuthContext, useAuthContext } from '../../auth/AuthContext';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '93%',
      paddingBottom: '1em',
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
  const firstUpdate = useRef(true);

  const [month, setMonth] = useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [workPlan, setWorkPlan] = useState<PlaningCalendar>({
    days: [] as PlaningDay[]
  } as PlaningCalendar);
  const [workers, setWorkers] = useState({list: [] as User[]});
  const [scheduleChanged, setScheduleChanged] = useState(false);
  const [loadedSchedule, setLoadedSchedule] = useState(false);
  const [isEditable, setEditable] = useState(true);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const authContext:IAuthContext = useAuthContext();

  useEffect(() => {
    const callApi = async () => {
      setBackdropOpen(backdropOpen => !backdropOpen);
      if (firstUpdate.current) {
        firstUpdate.current = false;
        const userArray = await getUsers(true);
        let workerArray: User[] = [];
        userArray.forEach((element) => {
          if (element.customrole === 'Worker') {
            workerArray.push(element);
          }
        });
        setWorkers({ list: workerArray });
      }

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

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
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

  const buttons = () => {
    return (
      <Grid container spacing={3} className={classes.root}>
        <Grid item>
          <Button id="thisMonth"
            variant="contained"
            color="primary"
            size="small"
            onClick={() => { setMonth((new Date().getMonth() + 1).toString())}}>
            This month
          </Button>
        </Grid>
        <Grid item>
          <Button
            id="nextMonth"
            variant="contained"
            color="primary"
            size="small"
            onClick={() => { setMonth((new Date().getMonth() + 2).toString())}}>
            Next month
          </Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid container className={classes.root} spacing={3}>
        {authContext.isOffice && (
          <SelectYearMonth year={year} month={month}
                handleYearChange={handleYearChange}
                handleMonthChange={handleMonthChange}/>
        )}
        {!authContext.isOffice && (
          buttons()
        )}
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
                ? <WorkingDay index={index} day={value} workers={workers.list}
                    isEditable={isEditable && authContext.isOffice}
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
      {authContext.isOffice && (
        <WorkerChips isEditable={isEditable} workers={workers.list} />
      )}
      { authContext.isOffice && (
        <ScheduleActionButtons key="fab"
                              isEditable={isEditable}
                              isSaveActive={scheduleChanged}
                              isDeleteActive={loadedSchedule}
                              handleSave={handleSave}
                              handleDelete={confirmDelete} />
          )}
    </DndProvider>
  );
}

export default WorkSchedule;
