import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import middy from '@middy/core'
import cors from '@middy/http-cors'

import { createLogger } from '../../../utils/logger';
import { config } from '../../../config/config';

// FIXME Region from config
const cognitoClient = new AWS.CognitoIdentityServiceProvider({
  apiVersion: config.cognito.API_VERSION,
  region: "us-east-1"
});
const logger = createLogger('CreateUser');

// TODO - Implement
// TODO - Doc me
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);
  //TODO: Read Body
  const userName:string = event.pathParameters.userId;

  var params = {
    UserPoolId: '3p10t8mc7h8rtc6p9mlmhfsgdb',
    Username: userName,
    /* UserAttributes: [
      {
        Name: 'name',
        Value: 'STRING_VALUE'
      },
    ] */
  };

  try {
    const result = await cognitoClient.adminCreateUser(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(result.User)
    }
  } catch(err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors());