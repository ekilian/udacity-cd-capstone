import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import middy from '@middy/core'
import cors from '@middy/http-cors'

import { createLogger } from '../../../utils/logger';
import { config } from '../../../config/config';

// FIXME Region from config
const cognitoClient = new AWS.CognitoIdentityServiceProvider({
  apiVersion: config.cognito.COGNITO_VERSION,
  region: "us-east-2"
});
const logger = createLogger('CreateUser');

// FIXME - Refactor
// TODO - Doc me
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const parsedBody: any = JSON.parse(event.body);

  let params = {
    UserPoolId: parsedBody.UserPoolId,
    Username: parsedBody.Username,
    TemporaryPassword: parsedBody.Password,
    DesiredDeliveryMediums: [ "EMAIL" ],
    UserAttributes: parsedBody.UserAttributes
  };
  //Set updated_at
  params.UserAttributes.push({
    Name: "updated_at",
    Value: new Date().getTime().toString()
  })

  var confirmParams = {
    Password: parsedBody.Password,
    UserPoolId: parsedBody.UserPoolId,
    Username: parsedBody.Username,
    Permanent: true
  };

  logger.info("Calling AdminCreateUser with: ", params);
  try {
    await cognitoClient.adminCreateUser(params).promise();
    await cognitoClient.adminSetUserPassword(confirmParams).promise();
  } catch (err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

  return {
    statusCode: 201,
    body: ''
  }

}).use(cors())