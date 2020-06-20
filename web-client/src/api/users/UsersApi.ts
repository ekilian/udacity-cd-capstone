import axios from 'axios';
import config from '../../config';
import { User } from '../../model/User';


export const getUser = async (username:string): Promise<User> => {
  const result = await axios.get(`${config.apiGateway.ENDPOINT_URL}/users/${username}`);
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

export const getUsers = async (): Promise<User[]> => {
  const result = await axios.get(config.apiGateway.ENDPOINT_URL + '/users');
  let workerArray: User[] = [];
  result.data.forEach((element: any) => {
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

export const createUser = async (userToCreate: User): Promise<boolean> => {
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
      userAttributes.push({
        'Name': key,
        "Value": value
      });
    }
  }

  const params = {
    "Username": userToCreate.username,
    "UserPoolId": config.cognito.USER_POOL_ID,
    "UserAttributes": userAttributes
  }

  try {
    await axios.post(`${config.apiGateway.ENDPOINT_URL}/users`, params);
    return true;
  } catch(error) {
    console.log(error);
  }
  return false;
}

export const editUser = async (userToEdit: User): Promise<boolean> => {
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
    "UserPoolId": config.cognito.USER_POOL_ID,
    "UserAttributes": userAttributes
  }

  try {
    await axios.patch(`${config.apiGateway.ENDPOINT_URL}/users/${userToEdit.username}`, params);
    return true;
  } catch(error) {
    console.log(error);
  }
  return false;
}

// TODO Docme
export const deleteUser = async (username:string): Promise<boolean> => {
  console.log('delete:', username)
  try {
    await axios.delete(`${config.apiGateway.ENDPOINT_URL}/users/${username}`);
    return true;
  } catch(error) {
    console.log(error);
  }
  return false;
}