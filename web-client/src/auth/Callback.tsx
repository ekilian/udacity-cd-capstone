import React, { useEffect } from 'react';

import { Backdrop, CircularProgress, makeStyles, createStyles, Theme } from '@material-ui/core';
import config from '../config';
import axios from 'axios';
import qs from 'qs';
import { IAuthContext, useAuthContext, ICognitoAuth, useCognitoContext } from './AuthContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }),
);

const GRAND_TYPE = 'authorization_code'

const Callback: React.FC = () => {
  const classes = useStyles();
  const authContext:IAuthContext = useAuthContext();
  const cognitoContext:ICognitoAuth = useCognitoContext();
  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    const callAuth = async () => {
      const authCode = window.location.search.split('=')[1]
      const awsAuthResponse = await awsCallTokenEndpoint(GRAND_TYPE, authCode);
      authContext.setIsAuthenticated(true);
      cognitoContext.setAuthData(awsAuthResponse.data);
      setOpen(false);
    }
    callAuth();
  }, [])

  const awsCallTokenEndpoint = async (grantType: string, accessToken: string) => {
    const data = {
      grant_type: grantType,
      client_id: config.cognito.APP_CLIENT_ID,
      code: accessToken,
      scope: 'openid',
      redirect_uri: config.cognito.CALLBACK_URL,
    };
    const authBasic = 'Basic ' + Buffer.from(`${config.cognito.APP_CLIENT_ID}:${config.cognito.APP_SECRET}`).toString('base64');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authBasic
    }
    const dataString = qs.stringify(data);
    const awsResponse = await axios.post(config.cognito.TOKEN_ENDPOINT, dataString, {
      headers: headers,
    });
    return awsResponse;
  }

  return (
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )

}
export default Callback;
