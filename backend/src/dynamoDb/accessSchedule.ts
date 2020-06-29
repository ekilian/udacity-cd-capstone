import * as AWS from 'aws-sdk';
import { config } from '../config';
import { createLogger } from '../utils/logger';

const dbClient = new AWS.DynamoDB.DocumentClient()
const logger = createLogger('AccessSchedule');

/**
 * Query the DynamoDB for a specific work schedule.
 *
 * @param year - Value for the partition key.
 * @param month - Value for the sort key.
 */
export const querySchedule = async (year:number, month:number) => {
  const params = {
    TableName: config.dynamoDb.SCHEDULE_TABLE,
    KeyConditionExpression: '#y = :year AND #m = :month',
    ExpressionAttributeNames: {
      "#y": "year",
      "#m": "month"
    },
    ExpressionAttributeValues: {
      ':year': year,
      ':month': month
    }
  }
  try {
    logger.info('Query DynamoDB:', { 'params': params });
    return await dbClient.query(params).promise();
  } catch (error) {
    logger.error('Failed querying DynamoDB.', error);
    throw error;
  }
}

/**
 * Inserts a work schedule object into the DynamoDB.
 *
 * @param year - Value for the partition key.
 * @param month - Value for the sort key.
 */
export const insertSchedule = async (params:any):Promise<void>  => {
  params.TableName = config.dynamoDb.SCHEDULE_TABLE;
  try {
    logger.info('Insert into DynamoDB with:', params);
    await dbClient.put(params).promise();
  } catch (error) {
    logger.error('Failed querying DynamoDB.', error);
    throw error;
  }
}

/**
 * Deletes one dataset from the DynamoDB.
 *
 * @param year - Value for the partition key.
 * @param month - Value for the sort key.
 */
export const deleteSchedule = async (year:number, month:number):Promise<void> => {
  const params = {
    TableName: config.dynamoDb.SCHEDULE_TABLE,
    Key: {
      'year': year,
      'month': month
    },
    ReturnValues: 'NONE'
  }
  try {
    await dbClient.delete(params).promise();
  } catch (error) {
    logger.error('Failed to delete dataset in DynamoDB.', error);
    throw error;
  }
}