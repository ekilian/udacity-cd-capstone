import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../utils/logger';
import cors from '@middy/http-cors';
import middy from '@middy/core';
import { deleteUser } from '../../../business/users';


const logger = createLogger('DeleteUser');

// FIXME - Refactor
// TODO - Doc me
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const userName: string = event.pathParameters.userId;
  if (!userName) {
    return {
      statusCode: 400,
      body: 'Missing parameter: username'
    }
  }
  try {
    await deleteUser(userName);
    return {
      statusCode: 200,
      body: `User with Username ${userName} has successfully been deleted.`
    }
  } catch (err) {
    logger.error(err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }

}).use(cors())