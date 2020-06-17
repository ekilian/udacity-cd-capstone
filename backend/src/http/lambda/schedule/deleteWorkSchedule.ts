import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../utils/logger';
import * as AWS from 'aws-sdk';
import middy from '@middy/core';
import cors from '@middy/http-cors';

import { config } from '../../../config/config';


const dbClient = new AWS.DynamoDB.DocumentClient()
const logger = createLogger('DeleteWorkCalendar');

// TODO - Implement
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const year = parseInt(event.pathParameters.year);
  const month = parseInt(event.pathParameters.month);

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
    return {
      statusCode: 200,
      body: ''
    }
  } catch (err) {
    logger.error('DELETE failed:', err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong.',
    }
  }

}).use(cors())