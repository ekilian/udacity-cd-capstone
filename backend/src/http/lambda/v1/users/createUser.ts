import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core'
import cors from '@middy/http-cors'
import { createLogger } from '../../../../utils/logger';
import { createNewUser } from '../../../../business/users';


const logger = createLogger('CreateUser');

/**
 * Function: CreateUser.
 *
 * API-Endpoint for method POST at /users/.
 *
 * @param event - The Event-Proxy passed from API Gateway.
 * @returns Response with:
 *          - status code 201 and empty body if successful.
 *          - status code 500 if processing failed.
 */
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const parsedBody:any = JSON.parse(event.body);
  try {
    await createNewUser(parsedBody);
    return {
      statusCode: 201,
      body: ''
    }
  } catch (err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors())