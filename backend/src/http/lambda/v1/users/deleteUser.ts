import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../../utils/logger';
import cors from '@middy/http-cors';
import middy from '@middy/core';
import { deleteUser } from '../../../../business/users';


const logger = createLogger('DeleteUser');

/**
 * Function: DeleteUser.
 *
 * API-Endpoint for method DELETE at /users/{userId}.
 *
 * @param event - The Event-Proxy passed from API Gateway.
 * @returns Response with:
 *          - status code 200 and List of Users as JSON in body.
 *          - status code 500 if processing failed.
 */
// FIXME - Refactor
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const userName: string = event.pathParameters.userId;
  if (!userName) {
    return {
      statusCode: 400,
      body: 'Missing parameter: username'
    }
  }
  try {
    await deleteUser(userName);
    return {
      statusCode: 200,
      body: `User with Username ${userName} has successfully been deleted.`
    }
  } catch (err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors())