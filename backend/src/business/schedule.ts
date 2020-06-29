import { createLogger } from '../utils/logger';
import { querySchedule, insertSchedule, deleteSchedule } from '../dynamoDb/accessSchedule';

const logger = createLogger('Schedule');


/**
 * Reads a specific work schedule form the Database.
 *
 * @param year - the year of the schedule
 * @param month - the month of the schedule
 * @returns The found schedule as JSON. If no schedule is found an empty object is returned.
 */
export const readWorkSchedule = async (year:number, month:number) => {
  try {
    const result = await querySchedule(year, month);
    if(result.Items.length > 0) {
      return result.Items[0]
    }
  } catch(err) {
    logger.error('Failed to call Users.adminDeleteUser()', err);
    throw err;
  }
  return {};
}

/**
 * Creates or updates a work schedule in the Database.
 *
 * @param schedule - The work schedule as JSON
 */
export const createOrUpdateSchedule = async (schedule:any):Promise<void>  => {
  const params = {
    Item: {
      year: schedule.year,
      month: schedule.month,
      schedule: schedule.days,
    }
  }

  try {
    await insertSchedule(params);
  } catch(err) {
    logger.error('Failed to call AccessSchedule.insertSchedule().', err);
    throw err;
  }
}

/**
 * Removes a work schedule form the Database.
 *
 * @param year - the year of the schedule
 * @param month - the month of the schedule
 */
export const removeWorkSchedule = async (year:number, month:number):Promise<void> => {
  try {
    await deleteSchedule(year, month);
  } catch(err) {
    logger.error('Failed to call AccessSchedule.deleteSchedule()', err);
    throw err;
  }
}