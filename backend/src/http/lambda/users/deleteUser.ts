import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk';

import { createLogger } from '../../../utils/logger';
import { config } from '../../../config/config';
import cors from '@middy/http-cors';
import middy from '@middy/core';


// FIXME Region from config
const cognitoClient = new AWS.CognitoIdentityServiceProvider({
  apiVersion: config.cognito.API_VERSION,
  region: "us-east-1"
});
const logger = createLogger('DeleteUser');

// TODO - Implement
// TODO - Doc me
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const userName:string = event.pathParameters.userId;

  var params = {
    UserPoolId: '3p10t8mc7h8rtc6p9mlmhfsgdb',
    Username: userName
  };

  try {
    await cognitoClient.adminDeleteUser(params).promise();
    return {
      statusCode: 201,
      body: ''
    }
  } catch(err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors())