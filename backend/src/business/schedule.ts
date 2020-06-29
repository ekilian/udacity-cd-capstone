import { createLogger } from '../utils/logger';
import { querySchedule, insertSchedule, deleteSchedule } from '../dynamoDb/accessSchedule';

const logger = createLogger('Schedule');


/**
 * TODO
 *
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
 * TODO
 *
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

export const removeWorkSchedule = async (year:number, month:number):Promise<void> => {
  try {
    await deleteSchedule(year, month);
  } catch(err) {
    logger.error('Failed to call AccessSchedule.deleteSchedule()', err);
    throw err;
  }
}