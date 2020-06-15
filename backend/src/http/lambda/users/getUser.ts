import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { createLogger } from '../../../utils/logger';


const cognitoClient = new AWS.CognitoIdentityServiceProvider()
const logger = createLogger('GetUser');

// TODO - Implement
// TODO - Doc me
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const userName:string = event.pathParameters.userId;

  var params = {
    Username: userName,
    UserPoolId: 'us-east-2_gSbjOa8i9'
  };

  try {
    const result = await cognitoClient.adminGetUser(params).promise();
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

  return undefined;
}