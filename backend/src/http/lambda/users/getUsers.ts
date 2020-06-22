import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core'
import cors from '@middy/http-cors'

import { createLogger } from '../../../utils/logger';
import { config } from '../../../config';
import { listUsers } from '../../../cognito/accessCognito';

const logger = createLogger('GetUsers');

// FIXME - Refactor
// TODO - Doc me
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  var params = {
    UserPoolId: config.cognito.USER_POOL_ID
  };

  try {
    const result = await listUsers(params);
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