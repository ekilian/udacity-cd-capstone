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

  try {
    const result = await cognitoClient.adminUpdateUserAttributes(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  } catch(err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors())