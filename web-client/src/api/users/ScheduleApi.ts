import axios from 'axios';
import { PlaningCalendar } from '../../model/Calendar';
import config from '../../config';


export const getWorkSchedule = async (year:number, month:number):Promise<PlaningCalendar> => {
  const result = await axios.get(`${config.apiGateway.URL}/schedule/${year}/${month}`);
  let response;
  if(result.data !== '') {
    response = result.data;
    response.days = response.schedule;
    delete response.schedule;
  }
  return response as PlaningCalendar;
}

export const saveWorkSchedule = async (schedule:PlaningCalendar):Promise<PlaningCalendar> => {
  console.log(schedule)
  await axios.post(`${config.apiGateway.URL}/schedule`, schedule);
  return {} as PlaningCalendar;
}

export const deleteWorkSchedule = async (year:number, month:number):Promise<PlaningCalendar> => {
  console.log('Delete');
  return {} as PlaningCalendar;
}