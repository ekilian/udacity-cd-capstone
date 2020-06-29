import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../../utils/logger';
import middy from '@middy/core';
import cors from '@middy/http-cors';

import { checkNumberParameters } from '../../../../utils/validation';
import { readWorkSchedule } from '../../../../business/schedule';


const logger = createLogger('GetWorkCalendar');

/**
 * Function: GetWorkSchedule.
 *
 * API-Endpoint for method GET at /schedule/.
 *
 * @param event - The Event-Proxy passed from API Gateway.
 * @returns Response with status code:
 *          - 200 and the schedule as JSON in body.
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
    const result = await readWorkSchedule(year, month);
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch (err) {
    logger.error('Failed query DynamodDB for Schedule:', err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }
}).use(cors())