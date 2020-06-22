import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../utils/logger';
import * as AWS from 'aws-sdk';
import middy from '@middy/core';
import cors from '@middy/http-cors';

import { config } from '../../../config';


const dbClient = new AWS.DynamoDB.DocumentClient()
const logger = createLogger('UpdateWorkCalendar');

// TODO - Implement
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const year = parseInt(event.pathParameters.year);
  const month = parseInt(event.pathParameters.month);
  const schedule = JSON.parse(event.body)

  const params = {
    TableName: config.dynamoDb.SCHEDULE_TABLE,
    Key: {
      'year': year,
      'month': month
    },
    UpdateExpression: 'SET schedule = :schedule',
    ExpressionAttributeValues: {
      ':schedule': schedule.days,
    },
    ReturnValues: 'UPDATED_NEW'
  }

  logger.info('Update Todo-Table:', { 'params': params });
  try {
    const updated = await dbClient.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(updated)
    }
  } catch (err) {
    logger.error('Failed query DynamodDB for Schedule:', err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }
}).use(cors())