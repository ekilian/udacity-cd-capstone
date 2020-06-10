import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';
import { createLogger } from '../../../utils/logger';


const cognitoClient = new AWS.CognitoIdentityServiceProvider()
const logger = createLogger('GetUser');

// TODO - Implement
// TODO - Doc me
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const accessToken:string = "TODO: Read AccessToken from JWT";

  var params = {
    AccessToken: accessToken
  };

  try {
    const result = await cognitoClient.getUser(params).promise();
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