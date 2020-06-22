import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core'
import cors from '@middy/http-cors'
import { createLogger } from '../../../utils/logger';
import { config } from '../../../config';
import { adminGetUser } from '../../../cognito/accessCognito';

const logger = createLogger('GetUser');

// FIXME - Refactor
// TODO - Doc me
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