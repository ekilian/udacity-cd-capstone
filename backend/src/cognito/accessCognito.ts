import * as AWS from 'aws-sdk'
import { config } from '../config';
import { createLogger } from '../utils/logger';


const logger = createLogger('AccessCognito');

const cognitoClient = new AWS.CognitoIdentityServiceProvider({
  apiVersion: config.cognito.COGNITO_VERSION,
  region: config.AWS_REGION
});

/**
 *
 * @param params
 */
export const listUsers = async (params:any) => {
  logger.info("Calling listUsers with: ", params);
  return await cognitoClient.listUsers(params).promise();
}

/**
 *
 * @param params
 */
export const adminGetUser = async (params:any) => {
  logger.info("Calling adminGetUser with: ", params);
  return await cognitoClient.adminGetUser(params).promise();
}

/**
 *
 * @param params
 */
export const adminCreateUser = async (params:any) => {
  logger.info("Calling AdminCreateUser with: ", params);
  return await cognitoClient.adminCreateUser(params).promise();
}

/**
 *
 * @param params
 */
export const adminSetUserPassword = async (params:any) => {
  logger.info("Calling AdminSetUserPassword with: ", params);
  return await cognitoClient.adminSetUserPassword(params).promise();
}

/**
 *
 * @param params
 */
export const adminDeleteUser = async (params:any) => {
  logger.info("Calling adminDeleteUser with: ", params);
  return await cognitoClient.adminDisableUser(params).promise();
}

/**
 *
 * @param params
 */
export const adminUpdateUserAttributes = async (params:any) => {
  logger.info("Calling adminUpdateUserAttributes with: ", params);
  return await cognitoClient.adminUpdateUserAttributes(params).promise();
}
