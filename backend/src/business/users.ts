import { config } from '../config';
import { adminCreateUser, adminSetUserPassword, adminDeleteUser, adminUpdateUserAttributes } from '../cognito/accessCognito';
import { createLogger } from '../utils/logger';


const logger = createLogger('AccessCognito');

/**
 *
 * @param parsedBody
 */
export const createNewUser = async (parsedBody:any) => {
  let params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    Username: parsedBody.Username,
    TemporaryPassword: parsedBody.Password,
    //DesiredDeliveryMediums: [ "EMAIL" ],
    UserAttributes: parsedBody.UserAttributes
  };
  addUpdatedAtParam(params);

  try {
    await adminCreateUser(params);
  } catch(err) {
    logger.error('Failed to call Users.adminCreateUser()', err);
    throw err;
  }
  var confirmParams = {
    Password: parsedBody.Password,
    UserPoolId: parsedBody.UserPoolId,
    Username: parsedBody.Username,
    Permanent: true
  };
  try {
    return await adminSetUserPassword(confirmParams);
  } catch(err) {
    logger.error('Failed to call Users.adminSetUserPassword()', err);
    throw err;
  }
}

export const updateUser = async (parsedBody:any) => {
  var params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    Username: parsedBody.Username,
    UserAttributes: parsedBody.UserAttributes
  };
  addUpdatedAtParam(params);

  try {
    return await adminUpdateUserAttributes(params);
  } catch(err) {
    logger.error('Failed to call Users.adminCreateUser()', err);
    throw err;
  }
}

/**
 *
 * @param username
 */
export const deleteUser = async (username:string) => {
  var params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    Username: username
  };
  try {
    return await adminDeleteUser(params);
  } catch(err) {
    logger.error('Failed to call Users.adminDeleteUser()', err);
    throw err;
  }
}

const addUpdatedAtParam = (params:any) => {
  params.UserAttributes.push({
    Name: "updated_at",
    Value: new Date().getTime().toString()
  });
}

