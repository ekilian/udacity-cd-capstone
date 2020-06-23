import axios from 'axios';
import { PlaningCalendar, PlaningDay } from '../model/Calendar';
import config from '../config';

/**
 * TODO Docme
 * @param year
 * @param month
 * @param authToken
 */
export const getWorkSchedule = async (year:number, month:number, authToken:string):Promise<PlaningCalendar> => {
  const result = await axios.get(`${config.apiGateway.ENDPOINT_URL}/${config.API_VERSION}/schedule/${year}/${month}`, {
    headers: {
      Authorization: authToken
    }
  });
  let response;
  if(result.data !== '') {
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
export const saveWorkSchedule = async (schedule:PlaningCalendar, authToken:string):Promise<PlaningCalendar> => {
  await axios.post(`${config.apiGateway.ENDPOINT_URL}/${config.API_VERSION}/schedule`, schedule, {
    headers: {
      Authorization: authToken
    }
  });
  return {} as PlaningCalendar;
}

/**
 * TODO Docme
 * @param year
 * @param month
 */
export const deleteWorkSchedule = async (year:number, month:number, authToken:string):Promise<PlaningCalendar> => {
  await axios.delete(`${config.apiGateway.ENDPOINT_URL}/${config.API_VERSION}/schedule/${year}/${month}`, {
    headers: {
      Authorization: authToken
    }
  });
  return {
    days: [] as PlaningDay[]
  } as PlaningCalendar;
}