import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import middy from '@middy/core'
import cors from '@middy/http-cors'

import { createLogger } from '../../../utils/logger';

const cognitoClient = new AWS.CognitoIdentityServiceProvider()
const logger = createLogger('GetUsers');

// FIXME - Refactor
// TODO - Doc me
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  var params = {
    UserPoolId: 'us-east-2_sJRdbCIjo'
  };

  try {
    const result = await cognitoClient.listUsers(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result.Users)
    }
  } catch(err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors())