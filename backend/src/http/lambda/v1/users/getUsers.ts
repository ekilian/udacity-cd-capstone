import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core'
import cors from '@middy/http-cors'

import { createLogger } from '../../../../utils/logger';
import { readAllUser } from '../../../../business/users';

const logger = createLogger('GetUsers');

/**
 * Function: GetUsers.
 *
 * API-Endpoint for method GET at /users/.
 *
 * @param event - The Event-Proxy passed from API Gateway.
 * @returns Response with:
 *          - status code 200 and List of Users as JSON in body.
 *          - status code 500 if processing failed.
 */
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  try {
    const result = await readAllUser();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Users)
    }
  } catch(err) {
    logger.error('Failed to call: listUsers', err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors())