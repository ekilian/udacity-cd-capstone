import { config } from '../config';
import { adminCreateUser, adminSetUserPassword, adminDisableUser, adminUpdateUserAttributes, listUsers, adminGetUser } from '../cognito/accessCognito';
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
    logger.error('Failed to call Users.adminGetUser()', err);
    throw err;
  }
}


/**
 * Gets all users of the configured User Pool from AWS Cognito.
 *
 * @returns Array of CognitoUsers
 */
export const readAllUser = async () => {
  var params = {
    UserPoolId: config.cognito.USER_POOL_ID
  };
  try {
    const result = await listUsers(params);
    return result.Users;
  } catch(err) {
    logger.error('Failed to call AccessCognito.listUsers()', err);
    throw err;
  }
}


/**
 * Creates a new User in the configured Cognito User Pool.
 *
 * If the creation of the new user is successful, that users gets activated
 * immediatly by setting the provided temporary password as a permanent password.
 *
 * @param parsedBody - the parsed body from the request as JSON.
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
    logger.error('Failed to call AccessCognito.adminCreateUser()', err);
    throw err;
  }
  var confirmParams = {
    Password: parsedBody.Password,
    UserPoolId: config.cognito.USER_POOL_ID,
    Username: parsedBody.Username,
    Permanent: true
  };
  try {
    return await adminSetUserPassword(confirmParams);
  } catch(err) {
    logger.error('Failed to call AccessCognito.adminSetUserPassword()', err);
    throw err;
  }
}

/**
 * Updates the attributes of a user in the configured Cognito User Pool.
 *
 * @param parsedBody - the parsed body from the request as JSON.
 */
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
    logger.error('Failed to call AccessCognito.adminUpdateUserAttributes()', err);
    throw err;
  }
}

/**
 * Deletes a User from the Cognito User Pool.
 *
 * Actually the user gets marked as disabled instead of deleting it from the datastore.
 * This is necessary to not loose information of that user.
 *
 * @param username - The username of the user to be deleted.
 */
export const deleteUser = async (username:string) => {
  var params = {
    UserPoolId: config.cognito.USER_POOL_ID,
    Username: username
  };
  try {
    return await adminDisableUser(params);
  } catch(err) {
    logger.error('Failed to call AccessCognito.adminDeleteUser()', err);
    throw err;
  }
}

/**
 * Generates a presigned Url for the S3 Bucket.
 *
 * @param userId - The Id of the User.
 *
 * @returns Object containing the signed URL from S3 and the URL to access the image.
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
    logger.error('Failed to generate signed URL', err);
    throw err;
  }
}

const addUpdatedAtParam = (params:any) => {
  params.UserAttributes.push({
    Name: "updated_at",
    Value: new Date().getTime().toString()
  });
}

