import * as AWS from 'aws-sdk'
import { config } from '../config';
import { createLogger } from '../utils/logger';


const cognitoClient = new AWS.CognitoIdentityServiceProvider({
  apiVersion: config.cognito.COGNITO_VERSION,
  region: config.AWS_REGION
});
const logger = createLogger('AccessCognito');

/**
 * Gets all users from the Cognito user pool by calling
 * CognitoIdentityServiceProvider.listUsers().
 *
 * @param params - The necessary params for the call to the Cognito service provider
 */
export const listUsers = async (params:any) => {
  logger.info("Calling listUsers with: ", params);
  return await cognitoClient.listUsers(params).promise();
}

/**
 * Gets the user information of a specified user by calling
 * CognitoIdentityServiceProvider.adminGetUser().
 *
 * @param params - The necessary params for the call to the Cognito service provider
 */
export const adminGetUser = async (params:any) => {
  logger.info("Calling adminGetUser with: ", params);
  return await cognitoClient.adminGetUser(params).promise();
}

/**
 * Creates a new Cognito user by calling CognitoIdentityServiceProvider.adminCreateUser()
 *
 * @param params - The necessary params for the call to the Cognito service provider
 */
export const adminCreateUser = async (params:any) => {
  logger.info("Calling AdminCreateUser with: ", params);
  return await cognitoClient.adminCreateUser(params).promise();
}

/**
 * Creates a new permanent password by calling CognitoIdentityServiceProvider.adminSetUserPassword()
 *
 * @param params - The necessary params for the call to the Cognito service provider
 */
export const adminSetUserPassword = async (params:any) => {
  logger.info("Calling AdminSetUserPassword with: ", params);
  return await cognitoClient.adminSetUserPassword(params).promise();
}

/**
 * Disables a user by calling CognitoIdentityServiceProvider.adminDisableUser()
 *
 * @param params - The necessary params for the call to the Cognito service provider
 */
export const adminDisableUser = async (params:any) => {
  logger.info("Calling AdminDisableUser with: ", params);
  return await cognitoClient.adminDisableUser(params).promise();
}

/**
 * Updates user attributes of a user by calling CognitoIdentityServiceProvider.adminUpdateUserAttributes().
 *
 * @param params - The necessary params for the call to the Cognito service provider
 */
export const adminUpdateUserAttributes = async (params:any) => {
  logger.info("Calling adminUpdateUserAttributes with: ", params);
  return await cognitoClient.adminUpdateUserAttributes(params).promise();
}
