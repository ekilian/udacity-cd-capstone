import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as AWS from 'aws-sdk'
import middy from '@middy/core'
import cors from '@middy/http-cors'

import { createLogger } from '../../../utils/logger';
import { config } from '../../../config/config';

// FIXME Region from config
const cognitoClient = new AWS.CognitoIdentityServiceProvider({
  apiVersion: config.cognito.API_VERSION,
  region: "us-east-2"
});
const logger = createLogger('CreateUser');

// TODO - Implement
// TODO - Doc me
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const parsedBody:any = JSON.parse(event.body);

  var params = {
    UserPoolId: parsedBody.UserPoolId,
    Username: parsedBody.Username,
    UserAttributes: parsedBody.UserAttributes
  };
  //Set updated_at
  params.UserAttributes.push({
    Name: "updated_at",
    Value: new Date().getTime().toString()
  })

  logger.info("Calling AdminCreateUser with: ", params);
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

})
.use(cors())