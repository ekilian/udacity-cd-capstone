import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core'
import cors from '@middy/http-cors'
import { createLogger } from '../../../../utils/logger';
import { config } from '../../../../config';
import { adminGetUser } from '../../../../cognito/accessCognito';

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
// FIXME - Refactor
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const userId = event.pathParameters.userId;
  var params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    Username: userId
  };

  try {
    const result = await adminGetUser(params);
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