import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../utils/logger';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import { deleteSchedule } from '../../../dynamoDb/accessSchedule';

const logger = createLogger('DeleteWorkCalendar');

// TODO - Implement
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const year = parseInt(event.pathParameters.year);
  const month = parseInt(event.pathParameters.month);

  try {
    await deleteSchedule(year, month)
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