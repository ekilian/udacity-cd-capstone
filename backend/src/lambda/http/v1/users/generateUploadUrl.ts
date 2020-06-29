import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import middy from '@middy/core'
import cors from '@middy/http-cors'

import { createLogger } from '../../../../utils/logger';
import { generateSignedUrl } from '../../../../business/users';


const logger = createLogger('GenerateUploadUrl');

/**
 * Handler for lambda function: GenerateUploadUrl.
 * Implements a POST API endpoint at: /users/{userId}/attachment
 * @param event - Event object passed from API Gateway.
 */
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const userName: string = event.pathParameters.userId;
  if (!userName) {
    return {
      statusCode: 400,
      body: 'Missing parameter: username'
    }
  }
  //FIXME
  const signedUrl = await generateSignedUrl(userName);

  return {
    statusCode: 200,
    body: JSON.stringify(signedUrl)
  }
}).use(cors());
