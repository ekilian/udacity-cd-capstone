import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import middy from '@middy/core'
import cors from '@middy/http-cors'

import { createLogger } from '../../../../utils/logger';
import { updateUser } from '../../../../business/users';

const logger = createLogger('EditUser');

// TODO - Implement
// TODO - Doc me
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const parsedBody:any = JSON.parse(event.body);

  try {
    const result = await updateUser(parsedBody);
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