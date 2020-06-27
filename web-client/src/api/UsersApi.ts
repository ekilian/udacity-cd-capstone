import axios from 'axios';
import config from '../config';
import { User } from '../model/User';
import { Auth } from 'aws-amplify';


/**
 * Calls the Users-API to get the data for the specified username.
 *
 * @param username - the username
 * @param authToken - the ID-Token that is necessary for authentication.
 */
export const getUser = async (username:string): Promise<User> => {
  const idToken = (await Auth.currentSession()).getIdToken();
  const result = await axios.get(`${config.apiGateway.ENDPOINT_URL}/users/${username}`, {
    headers: {
      Authorization: idToken.getJwtToken()
    }
  });
  let user: User = {
    username: username,
  }
  result.data.forEach((element: any) => {
    element['Attributes'].forEach((attr: any) => {
      if (attr.Name === 'given_name') {
        user.given_name = attr.Value;
      }
      if (attr.Name === 'family_name') {
        user.family_name = attr.Value;
      }
      if (attr.Name === 'address') {
        user.address = attr.Value;
      }
      if (attr.Name === 'phone_number') {
        if(attr.Value.startsWith('+')) {
          attr.Value = attr.Value.substr(1);
        }
        user.phone_number = attr.Value;
      }
    })
  });
  return user;
}

/**
 * Calls the Users-API to get all users from the Cognito user pool.
 *
 * @param onlyEnabled - if set to true processes only enabled users.
 * @param authToken - the ID-Token that is necessary for authentication.
 */
export const getUsers = async (onlyEnabled:boolean): Promise<User[]> => {
  const idToken = (await Auth.currentSession()).getIdToken();
  const result = await axios.get(`${config.apiGateway.ENDPOINT_URL}/${config.STAGE}/${config.API_VERSION}/users`, {
    headers: {
      Authorization: idToken.getJwtToken()
    }
  });
  let workerArray: User[] = [];
  result.data.forEach((element: any) => {
    if(onlyEnabled && element.Enabled === false) {
      return;
    }
    let user: User = {
      username: element.Username
    }
    element['Attributes'].forEach((attr: any) => {
      if (attr.Name === 'given_name') {
        user.given_name = attr.Value;
      }
      if (attr.Name === 'family_name') {
        user.family_name = attr.Value;
      }
      if (attr.Name === 'email') {
        user.email = attr.Value;
      }
      if (attr.Name === 'address') {
        user.address = attr.Value;
      }
      if (attr.Name === 'phone_number') {
        if(attr.Value.startsWith('+')) {
          attr.Value = attr.Value.substr(1);
        }
        user.phone_number = attr.Value;
      }
      if (attr.Name === 'custom:role') {
        user.customrole = attr.Value;
      }
      if (attr.Name === 'custom:imageUrl') {
        user.customimageUrl = attr.Value;
      }
    })
    workerArray.push(user);
  });
  return workerArray;
}

export const createUser = async (userToCreate: User): Promise<boolean> => {
  const userAttributes = [];
  for (let [key, value] of Object.entries(userToCreate)) {
    if (key.startsWith('custom')) {
      userAttributes.push({
        'Name': 'custom:' + key.substr(6),
        "Value": value
      });
    } else if (key === 'phone_number') {
      if(userToCreate.phone_number && userToCreate.phone_number.length < 10) {
        // Fake number to fulfill cognito requirements
        userToCreate.phone_number = '+510000000000';
      } else if(!userToCreate.phone_number?.startsWith('+51')) {
        userToCreate.phone_number = '+51' + userToCreate.phone_number
      }
      console.log('Phone', userToCreate.phone_number)
      userAttributes.push({
        'Name': key,
        "Value": userToCreate.phone_number
      });
    } else {
      if(key !== 'password' && key !== 'username') {
        userAttributes.push({
          'Name': key,
          "Value": value
        });
      }
    }
  }

  const params = {
    "Username": userToCreate.username,
    "Password": userToCreate.password,
    "UserAttributes": userAttributes
  }
  try {
    const idToken = (await Auth.currentSession()).getIdToken();
    await axios.post(`${config.apiGateway.ENDPOINT_URL}/${config.STAGE}/${config.API_VERSION}/users`, params, {
      headers: {
        Authorization: idToken.getJwtToken()
      }
    });
    return true;
  } catch(error) {
    console.log(error);
  }
  return false;
}

/**
 * TODO
 * FIXME Refactor
 * @param userToEdit
 * @param authToken
 */
export const editUser = async (userToEdit: User, fileToUpload?:any): Promise<boolean> => {
  const userAttributes = [];
  for (let [key, value] of Object.entries(userToEdit)) {
    // Custom attributes have prefix custom:
    if (key.startsWith('custom') && !(key.endsWith('imageUrl'))) {
      userAttributes.push({
        'Name': 'custom:' + key.substr(6),
        "Value": value
      });
    } else if (key === 'phone_number') {
      userToEdit.phone_number = '+' + userToEdit.phone_number
      userAttributes.push({
        'Name': key,
        "Value": userToEdit.phone_number
      });
    } else {
      // TODO: Move to Lambda
      if(key !== 'username') {
        userAttributes.push({
          'Name': key,
          "Value": value
        });
      }

    }
  }

  const params = {
    "Username": userToEdit.username,
    "UserAttributes": userAttributes
  }

  try {
    const idToken = (await Auth.currentSession()).getIdToken();
    if(fileToUpload) {
      const responseData = await getUploadUrl(userToEdit.username, idToken.getJwtToken())
      params.UserAttributes.push({
        'Name': "custom:imageUrl",
        "Value": responseData.attachmentUrl
      })
      await uploadFile(responseData.signedUrl, fileToUpload);
    }
    await axios.patch(`${config.apiGateway.ENDPOINT_URL}/${config.STAGE}/${config.API_VERSION}/users/`, params, {
      headers: {
        Authorization: idToken.getJwtToken()
      }
    });
    return true;
  } catch(error) {
    console.log(error);
  }
  return false;
}

/**
 * TODO Docme
 * @param username
 * @param authToken
 */
export const deleteUser = async (username:string): Promise<boolean> => {
  const idToken = (await Auth.currentSession()).getIdToken();
  try {
    await axios.delete(`${config.apiGateway.ENDPOINT_URL}/${config.STAGE}/${config.API_VERSION}/users/${username}`, {
      headers: {
        Authorization: idToken.getJwtToken()
      }
    });
    return true;
  } catch(error) {
    console.log(error);
  }
  return false;
}

const getUploadUrl = async (username:string, jwtToken:string): Promise<any> => {
  const response = await axios.post(`${config.apiGateway.ENDPOINT_URL}/${config.STAGE}/${config.API_VERSION}/users/attachment/${username}`, {}, {
    headers: {
      Authorization: jwtToken
    }
  });
  return response.data;
}

const uploadFile = async (uploadUrl: string, file: Buffer): Promise<void> => {
  await axios.put(uploadUrl, file)
}