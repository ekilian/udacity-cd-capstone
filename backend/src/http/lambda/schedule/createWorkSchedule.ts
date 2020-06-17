import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../utils/logger';
import * as AWS from 'aws-sdk';
import middy from '@middy/core';
import cors from '@middy/http-cors';

import { config } from '../../../config/config';


const dbClient = new AWS.DynamoDB.DocumentClient()
const logger = createLogger('CreateWorkCalendar');


// TODO - Implement
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const schedule = JSON.parse(event.body);

  const params = {
    TableName: config.dynamoDb.SCHEDULE_TABLE,
    Item: {
      year: schedule.year,
      month: schedule.month,
      schedule: schedule.days,
    }
  }

  logger.info('Params: ', params);
  try {
    await dbClient.put(params).promise();
    return {
      statusCode: 200,
      body: '',
    }
  } catch (err) {
    logger.error('INSERT failed:', err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong.'
    }
  }

}).use(cors());