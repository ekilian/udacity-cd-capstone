import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../../utils/logger';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import { checkNumberParameters } from '../../../../utils/validation';
import { removeWorkSchedule } from '../../../../business/schedule';

const logger = createLogger('DeleteWorkCalendar');

/**
 * Function: DeleteWorkSchedule.
 *
 * API-Endpoint for method DELETE at /schedule/.
 *
 * @param event - The Event-Proxy passed from API Gateway.
 * @returns Response with status code:
 *          - 200 and an empty body if successful.
 *          - 400 if path parameter is missing
 *          - 500 if processing failed.
 */
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const year = parseInt(event.pathParameters.year);
  const month = parseInt(event.pathParameters.month);

  const valid = checkNumberParameters(year, month)
  if (!valid) {
    return {
      statusCode: 400,
      body: 'Missing or wrong parameter.'
    }
  }

  try {
    await removeWorkSchedule(year, month)
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