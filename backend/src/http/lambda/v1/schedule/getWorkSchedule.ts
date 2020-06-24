import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { createLogger } from '../../../../utils/logger';
import * as AWS from 'aws-sdk';
import middy from '@middy/core';
import cors from '@middy/http-cors';

import { config } from '../../../../config';

const dbClient = new AWS.DynamoDB.DocumentClient()
const logger = createLogger('GetWorkCalendar');

/**
 * Function: GetWorkSchedule.
 *
 * API-Endpoint for method GET at /schedule/.
 *
 * @param event - The Event-Proxy passed from API Gateway.
 * @returns Response with status code 200 and the result aa body if successful, or status code 500 if processing failed.
 */
// TODO - Implement validation
// FIXME Refactor
export const handler: APIGatewayProxyHandler = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info('Processing event: ', event);

  const year = parseInt(event.pathParameters.year);
  const month = parseInt(event.pathParameters.month);

  const params = {
    TableName: config.dynamoDb.SCHEDULE_TABLE,
    KeyConditionExpression: '#y = :year AND #m = :month',
    ExpressionAttributeNames: {
      "#y": "year",
      "#m": "month"
    },
    ExpressionAttributeValues: {
      ':year': year,
      ':month': month
    }
  }

  logger.info('Query DynamoDB:', { 'params': params });
  try {
    const result = await dbClient.query(params).promise();
    if(result.Items.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Items[0])
      }
    }
  } catch (err) {
    logger.error('Failed query DynamodDB for Schedule:', err);
    return {
      statusCode: 500,
      body: 'Ups. Something went wrong'
    }
  }
}).use(cors())