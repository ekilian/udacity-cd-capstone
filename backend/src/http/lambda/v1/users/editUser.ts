import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core'
import cors from '@middy/http-cors'

import { createLogger } from '../../../../utils/logger';
import { updateUser } from '../../../../business/users';

const logger = createLogger('EditUser');

/**
 * Function: EditUser.
 *
 * API-Endpoint for method PATCH at /users/.
 *
 * @param event - The Event-Proxy passed from API Gateway.
 * @returns Response with:
 *          - status code 200 and empty body if successful.
 *          - status code 500 if processing failed.
 */
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const parsedBody:any = JSON.parse(event.body);
  try {
    const result = await updateUser(parsedBody);
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch(err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors())