import React from 'react';
import { Backdrop, CircularProgress, makeStyles, createStyles, Theme } from '@material-ui/core';
import config from '../config';
import axios from 'axios'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

export default function Callback() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  try {
    // await awsCallTokenEndpoint('authorization_code', )
  } catch (error) {
    console.log(error);
  }

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )

}

async function awsCallTokenEndpoint(grantType:string, accessToken:string) {
  const data = {
    grant_type: grantType,
    client_id: config.cognito.APP_CLIENT_ID,
    code: accessToken,
    scope: 'profile',
    redirect_uri: 'http://localhost:3000/authcallback',
  };

  const url = 'https://bideax0dy3.auth.us-east-2.amazoncognito.com/oauth2/token';

  const awsResponse = await axios.post(url, {
    data: JSON.stringify(data),
    auth: {
      username: config.cognito.APP_CLIENT_ID
    }
  });
  return awsResponse;
}