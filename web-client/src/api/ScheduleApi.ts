import axios from 'axios';
import { PlaningCalendar, PlaningDay } from '../model/Calendar';
import config from '../config';
import { Auth } from 'aws-amplify';

/**
 * TODO Docme
 * @param year
 * @param month
 * @param authToken
 */
export const getWorkSchedule = async (year:number, month:number):Promise<PlaningCalendar> => {
  const idToken = (await Auth.currentSession()).getIdToken();
  const result = await axios.get(`${config.ENDPOINT_URL}/${config.STAGE}/${config.API_VERSION}/schedule/${year}/${month}`, {
    headers: {
      Authorization: idToken.getJwtToken()
    }
  });
  let response;
  if(Object.keys(result.data).length > 0) {
    response = result.data;
    response.days = response.schedule;
    delete response.schedule;
  }
  return response as PlaningCalendar;
}

/**
 * TODO Docme
 * @param schedule
 */
export const saveWorkSchedule = async (schedule:PlaningCalendar):Promise<PlaningCalendar> => {
  const idToken = (await Auth.currentSession()).getIdToken();
  await axios.post(`${config.ENDPOINT_URL}/${config.STAGE}/${config.API_VERSION}/schedule`, schedule, {
    headers: {
      Authorization: idToken.getJwtToken()
    }
  });
  return {} as PlaningCalendar;
}

/**
 * TODO Docme
 * @param year
 * @param month
 */
export const deleteWorkSchedule = async (year:number, month:number):Promise<PlaningCalendar> => {
  const idToken = (await Auth.currentSession()).getIdToken();
  await axios.delete(`${config.ENDPOINT_URL}/${config.STAGE}/${config.API_VERSION}/schedule/${year}/${month}`, {
    headers: {
      Authorization: idToken.getJwtToken()
    }
  });
  return {
    days: [] as PlaningDay[]
  } as PlaningCalendar;
}