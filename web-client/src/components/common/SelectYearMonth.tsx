import React from "react";

import { Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingBottom: '1em',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }),
);

export interface SelectYearMonthProps {
  year:string,
  month:string,
  handleMonthChange: (event:React.ChangeEvent<{ value: unknown }>) => void,
  handleYearChange: (event:React.ChangeEvent<{ value: unknown }>) => void
}

const SelectYearMonth:React.FC<SelectYearMonthProps> = (props) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3} className={classes.root}>
      <Grid item sm={2}>
        <FormControl className={classes.formControl}>
          <InputLabel id="month-label">Month</InputLabel>
          <Select
            labelId="month-select-label"
            id="month-select"
            value={props.month}
            onChange={props.handleMonthChange}
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
            value={props.year}
            onChange={props.handleYearChange}
          >
            <MenuItem key={1} value={2020}>2020</MenuItem>
            <MenuItem key={2} value={2021}>2021</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default SelectYearMonth;