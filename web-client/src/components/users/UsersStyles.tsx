import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paperOffice: {
      height: 300,
      width: 350,
      margin: 10,
      boxShadow: '0px 0px 8px 5px rgba(111, 240, 89, 0.6)',
    },
    paperWorker: {
      height: 300,
      width: 350,
      margin: 10,
      boxShadow: '0px 0px 8px 5px rgba(89, 142, 222, 0.6)',
    },
    divider: {
      padding: 10,
    },
    textField: {
      paddingBottom: '10px'
    },
    drawerFormOpen: {
      flex: 25,
      maxWidth: 300,
    },
    drawerFormClose: {
      flex: 0,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));