import * as AWS from 'aws-sdk';
import { config } from '../config';
import { createLogger } from '../utils/logger';


const dbClient = new AWS.DynamoDB.DocumentClient()
const logger = createLogger('AccessSchedule');

/**
 * TODO: docme
 * @param schedule
 */
export const insertSchedule = async (schedule:any) => {

  const params = {
    TableName: config.dynamoDb.SCHEDULE_TABLE,
    Item: {
      year: schedule.year,
      month: schedule.month,
      schedule: schedule.days,
    }
  }
  logger.info('Insert into DynamoDB with:', params);
  await dbClient.put(params).promise();
}

export const deleteSchedule = async (year:number, month:number) => {

  const params = {
    TableName: config.dynamoDb.SCHEDULE_TABLE,
    Key: {
      'year': year,
      'month': month
    },
    ReturnValues: 'NONE'
  }

  await dbClient.delete(params).promise();
}