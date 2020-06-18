import axios from 'axios';
import { EditUserProps } from '../../components/users/EditUser';
import config from '../../config';
import { User } from '../../model/User';


export const getUsers = async (): Promise<User[]> => {
  const result = await axios.get(config.apiGateway.ENDPOINT_URL + '/users');
  let workerArray: User[] = [];
  result.data.forEach((element: any) => {
    let user: User = {
      username: element.Username,
      nickname: ''
    }
    element['Attributes'].forEach((attr: any) => {
      if (attr.Name === 'nickname') {
        user.nickname = attr.Value;
      }
      if (attr.Name === 'given_name') {
        user.surname = attr.Value;
      }
      if (attr.Name === 'family_name') {
        user.name = attr.Value;
      }
      if (attr.Name === 'address') {
        user.address = attr.Value;
      }
      if (attr.Name === 'phone_number') {
        user.phone = attr.Value;
      }
      if (attr.Name === 'birthdate') {
        user.birthdate = new Date(attr.Value).toString();
      }
    })
    workerArray.push(user);
  });
  return workerArray;
}

export const createUser = async (userToCreate: EditUserProps): Promise<boolean> => {
  const userAttributes = [];
  for (let [key, value] of Object.entries(userToCreate)) {
    if (key === 'custom') {
      for (let [innerkey, innervalue] of Object.entries(value)) {
        userAttributes.push({
          'Name': 'custom:' + innerkey,
          "Value": innervalue
        });
      }
    } else if (key === 'username') {
      //Set username as nickname
      userAttributes.push({
        'Name': 'nickname',
        'Value': userToCreate.username
      })
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