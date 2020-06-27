import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../../utils/logger';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import { insertSchedule } from '../../../../dynamoDb/accessSchedule';


const logger = createLogger('CreateWorkCalendar');


// TODO - Implement
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const schedule = JSON.parse(event.body);

  try {
    await insertSchedule(schedule);
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