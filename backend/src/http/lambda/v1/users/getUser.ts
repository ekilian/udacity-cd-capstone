import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core'
import cors from '@middy/http-cors'
import { createLogger } from '../../../../utils/logger';
import { readOneUser } from '../../../../business/users';


const logger = createLogger('GetUser');

/**
 * Function: GetUser.
 *
 * API-Endpoint for method GET at /users/{userId}.
 *
 * @param event - The Event-Proxy passed from API Gateway.
 * @returns Response with:
 *          - status code 200 and List of Users as JSON in body.
 *          - status code 500 if processing failed.
 */
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const userName = event.pathParameters.userId;
  if (!userName) {
    return {
      statusCode: 400,
      body: 'Missing parameter: username'
    }
  }

  try {
    const result = await readOneUser(userName);
    return {
      statusCode: 200,
      body: JSON.stringify(result.UserAttributes)
    }
  } catch(err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors())