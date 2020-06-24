import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../../utils/logger';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import { insertSchedule } from '../../../../dynamoDb/accessSchedule';


const logger = createLogger('CreateWorkCalendar');

/**
 * Function: CreateWorkSchedule.
 *
 * API-Endpoint for method POST at /schedule.
 *
 * @param event - The Event-Proxy passed from API Gateway.
 *
 * @returns Response with status code 200 and empty body if successful, or status code 500 if processing failed.
 */
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const schedule = JSON.parse(event.body);
  try {
    await insertSchedule(schedule);
    return {
      statusCode: 201,
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