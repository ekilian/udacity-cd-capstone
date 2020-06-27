import { config } from '../config';
import { adminCreateUser, adminSetUserPassword, adminDeleteUser, adminUpdateUserAttributes, listUsers, adminGetUser } from '../cognito/accessCognito';
import { createLogger } from '../utils/logger';
import { getUploadUrl } from '../utils/images';

const logger = createLogger('AccessCognito');


/**
 * Gets all users of the configured User Pool from AWS Cognito.
 *
 * @param username - The username of the user.
 * @returns Array of CognitoUSers
 */
export const readOneUser = async (username:string) => {
  var params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    Username: username
  };
  try {
    return await adminGetUser(params);
  } catch(err) {
    logger.error('Failed to call Users.adminDeleteUser()', err);
    throw err;
  }
}


/**
 * Gets all users of the configured User Pool from AWS Cognito.
 *
 * @returns Array of CognitoUSers
 */
export const readAllUser = async () => {
  var params = {
    UserPoolId: config.cognito.USER_POOL_ID
  };
  try {
    return await listUsers(params);
  } catch(err) {
    logger.error('Failed to call Users.adminDeleteUser()', err);
    throw err;
  }
}


/**
 *
 * @param parsedBody
 */
export const createNewUser = async (parsedBody:any) => {
  let params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    Username: parsedBody.Username,
    TemporaryPassword: parsedBody.Password,
    DesiredDeliveryMediums: [ "EMAIL" ],
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

/**
 * Generates a presigned Url for the S3 Bucket.
 * @param userId - The Id of the User.
 */
export const generateSignedUrl = async (username: string): Promise<object> => {
  try {
    const signedUrl = await getUploadUrl(username);
    const attachmentUrl = `https://${config.BUCKET_NAME}.s3.amazonaws.com/${username}`;
    logger.info('Generated presigned URL', { 'url': signedUrl, 'attachmentUrl': attachmentUrl });
    return {
      signedUrl: signedUrl,
      attachmentUrl: attachmentUrl
    };
  } catch (err) {
    logger.error('Failed to generate signed URL');
    throw err;
  }
}

const addUpdatedAtParam = (params:any) => {
  params.UserAttributes.push({
    Name: "updated_at",
    Value: new Date().getTime().toString()
  });
}

