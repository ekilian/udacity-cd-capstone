import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk';

import { createLogger } from '../../../utils/logger';
import { config } from '../../../config/config';
import cors from '@middy/http-cors';
import middy from '@middy/core';


// FIXME Region from config
const cognitoClient = new AWS.CognitoIdentityServiceProvider({
  apiVersion: config.cognito.COGNITO_VERSION,
  region: "us-east-2"
});
const logger = createLogger('DeleteUser');

// FIXME - Refactor
// TODO - Doc me
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const userName:string = event.pathParameters.userId;

  // TODO ppol from config -> from env
  var params = {
    UserPoolId: 'us-east-2_sJRdbCIjo',
    Username: userName
  };

  try {
    await cognitoClient.adminDeleteUser(params).promise();
    return {
      statusCode: 201,
      body: `User with Username ${userName} has successfully been deleted.`
    }
  } catch(err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors())