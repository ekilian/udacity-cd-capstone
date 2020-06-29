import React, { useEffect } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from 'recharts'
import { getUsers } from '../../api/UsersApi';
import { User } from '../../model/User';
import { getWorkSchedule } from '../../api/ScheduleApi';
import { PlaningCalendar } from '../../model/Calendar';
import { Grid, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SelectYearMonth from '../common/SelectYearMonth';


export interface BarChartData {
  name: string,
  Hours: number
}

const HOURS_PER_SHIFT: number = 8;
const SNACKBAR_POSITION: any = { vertical: 'top', horizontal: 'right' }

const SimpleBarChart: React.FC = () => {
  const initdata: BarChartData[] = [];
  const [data, setData] = React.useState(initdata);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [month, setMonth] = React.useState((new Date().getMonth() + 1).toString());
  const [year, setYear] = React.useState(new Date().getFullYear().toString());

  useEffect(() => {
    const callApi = async () => {
      const loadedSchedule = await getWorkSchedule(parseInt(year), parseInt(month));
      if(loadedSchedule) {
        const userArray = await getUsers(false);
        let workerArray: User[] = [];
        userArray.forEach((element) => {
          if (element.customrole === 'Worker') {
            workerArray.push(element);
          }
        });
        setData(buildData(loadedSchedule, workerArray));
      } else {
        setAlertOpen(true);
      }
    }
    callApi();
  }, [month, year]);

  const handleClose = () => {
    setAlertOpen(false);
  };

  const buildData = (schedule: PlaningCalendar, workers: User[]): BarChartData[] => {
    let result: BarChartData[] = [];
    workers.forEach(worker => {
      let calcValue: number = countValue(schedule, worker);
      if(calcValue > 0 && worker.enabled) {
        result.push({
          name: worker.given_name + ' ' + worker.family_name?.charAt(0) + '.',
          Hours: calcValue
        });
      }
    });
    console.log(result);
    return result;
  }

  const countValue = (plan: PlaningCalendar, worker: User): number => {
    let result: number = 0;
    plan.days.forEach((day) => {
      day.morning.forEach((element) => {
        if (element === worker.id) {
          result += HOURS_PER_SHIFT;
        }
      });
      day.afternoon.forEach((element) => {
        if (element === worker.id) {
          result += HOURS_PER_SHIFT;
        }
      });
      day.night.forEach((element) => {
        if (element === worker.id) {
          result += HOURS_PER_SHIFT;
        }
      })
    })
    return result;
  }

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newMonth = event.target.value as string
    setMonth(newMonth);
  };

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const newYear = event.target.value as string
    setYear(newYear);
  };

  return (
    <Grid container spacing={3} direction="column">
      <Grid container spacing={3} direction="row">
        <SelectYearMonth year={year} month={month}
              handleYearChange={handleYearChange}
              handleMonthChange={handleMonthChange}/>
      </Grid>
      <Grid item>
        <BarChart width={900} height={700} data={data} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Legend />
          <Bar dataKey="Hours" fill="#8884d8" barSize={40} />
        </BarChart>
      </Grid>
      <Snackbar open={alertOpen} autoHideDuration={5000} onClose={handleClose} anchorOrigin={SNACKBAR_POSITION}
              style={{ top: 75}}>
        <MuiAlert severity="info" onClose={handleClose} variant="filled">
          There is no data available for the choosen Month/Year.
        </MuiAlert>
      </Snackbar>
    </Grid>

  );
}

export default SimpleBarChart;