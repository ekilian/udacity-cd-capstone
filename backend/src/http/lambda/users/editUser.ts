import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import middy from '@middy/core'
import cors from '@middy/http-cors'

import { createLogger } from '../../../utils/logger';

const cognitoClient = new AWS.CognitoIdentityServiceProvider();
const logger = createLogger('EditUser');

// TODO - Implement
// TODO - Doc me
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  //TODO: Read Body
  const userName:string = event.pathParameters.userId;

  var params = {
    UserPoolId: 'us-east-2_gSbjOa8i9',
    Username: userName,
   /*  UserAttributes: [
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

}).use(cors())