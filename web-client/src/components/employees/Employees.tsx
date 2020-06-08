import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Employee } from '../../model/Employee';
import { EMPLOYEE_STATUS } from '../../utils/constants';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '100%',
        },
        paper: {
            height: 200,
            width: 200,
            border_color: blue,
        },
        divider: {
            padding: 10,
        },
    })
);


const createAdmins = (): Employee[] => {
    let result = new Array<Employee>();
    result.push({
        id: '1', name: 'Pamela', surname: 'Ojeda', status: EMPLOYEE_STATUS.Admin
    });
    return result;
}

const createOffice = (): Employee[] => {
    let result = new Array<Employee>();
    result.push({
        id: '2', name: 'Rosalie', surname: 'Ultima', status: EMPLOYEE_STATUS.Office
    });
    return result;
}

const createWorker = (): Employee[] => {
    let result = new Array<Employee>();
    result.push({
        id: '3', name: 'Raul', surname: 'Wasweisi', status: EMPLOYEE_STATUS.Worker
    });
    result.push({
        id: '4', name: 'Gloria', surname: 'Rodriguez', status: EMPLOYEE_STATUS.Worker
    });
    return result;
}

export default function Employees() {

    const classes = useStyles();
    const admins = createAdmins();
    const office = createOffice();
    const worker = createWorker();

    return (
        <Grid container xl className={classes.root}>
            <Grid container spacing={3} justify="center">
                {admins.map((value) => (
                    <Grid item key={value.id} md={2}>
                        <Paper className={classes.paper}>
                            <span>{value.name}</span>&nbsp;<span>{value.surname}</span>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Divider className={classes.divider}/>
            <Grid container spacing={3} justify="center">
                {office.map((value) => (
                    <Grid item key={value.id} md={2}>
                        <Paper className={classes.paper}>
                            <span>{value.name}</span>&nbsp;<span>{value.surname}</span>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <Divider className={classes.divider}/>
            <Grid container spacing={3} justify="center">
                {worker.map((value) => (
                    <Grid item key={value.id} md={2}>
                        <div>
                            <span>{value.name}</span>&nbsp;<span>{value.surname}</span>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}
