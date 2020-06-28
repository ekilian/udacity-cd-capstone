import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../../utils/logger';
import middy from '@middy/core';
import cors from '@middy/http-cors';
import { createOrUpdateSchedule } from '../../../../business/schedule';


const logger = createLogger('CreateWorkCalendar');

/**
 * Function: DeleteWorkSchedule.
 *
 * API-Endpoint for method POST at /schedule/.
 *
 * Validation of request is done by API-Gateway using: \lambda\http\v1\validation\create-schedule-schema.json
 *
 * @param event - The Event-Proxy passed from API Gateway.
 * @returns Response with status code:
 *          - 200 and an empty body if successful.
 *          - 500 if processing failed.
 */
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const schedule = JSON.parse(event.body);

  try {
    await createOrUpdateSchedule(schedule);
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