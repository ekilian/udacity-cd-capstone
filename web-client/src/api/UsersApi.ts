import axios from 'axios';
import config from '../config';
import { User } from '../model/User';


/**
 * Calls the Users-API to get the data for the specified username.
 *
 * @param username - the username
 * @param authToken - the ID-Token that is necessary for authentication.
 */
export const getUser = async (username:string, authToken:string): Promise<User> => {
  const result = await axios.get(`${config.apiGateway.ENDPOINT_URL}/users/${username}`, {
    headers: {
      Authorization: authToken
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
export const getUsers = async (onlyEnabled:boolean, authToken:string): Promise<User[]> => {
  const result = await axios.get(`${config.apiGateway.ENDPOINT_URL}/${config.API_VERSION}/users`, {
    headers: {
      Authorization: authToken
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
    })
    workerArray.push(user);
  });
  return workerArray;
}

export const createUser = async (userToCreate: User, authToken:string): Promise<boolean> => {
  const userAttributes = [];
  for (let [key, value] of Object.entries(userToCreate)) {
    if (key.startsWith('custom')) {
      userAttributes.push({
        'Name': 'custom:' + key.substr(6),
        "Value": value
      });
    } else if (key === 'phone_number') {
      userToCreate.phone_number = '+51' + userToCreate.phone_number
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
    await axios.post(`${config.apiGateway.ENDPOINT_URL}/${config.API_VERSION}/users`, params, {
      headers: {
        Authorization: authToken
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
export const editUser = async (userToEdit: User, authToken:string): Promise<boolean> => {
  const userAttributes = [];
  for (let [key, value] of Object.entries(userToEdit)) {
    if (key.startsWith('custom')) {
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
    await axios.patch(`${config.apiGateway.ENDPOINT_URL}/${config.API_VERSION}/users/${userToEdit.username}`, params, {
      headers: {
        Authorization: authToken
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
export const deleteUser = async (username:string, authToken:string): Promise<boolean> => {
  console.log('delete:', username)
  try {
    await axios.delete(`${config.apiGateway.ENDPOINT_URL}/${config.API_VERSION}/users/${username}`, {
      headers: {
        Authorization: authToken
      }
    });
    return true;
  } catch(error) {
    console.log(error);
  }
  return false;
}