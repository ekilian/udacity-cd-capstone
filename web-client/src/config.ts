
export default {
  REGION: process.env.REACT_APP_AWS_REGION,
  API_VERSION: process.env.REACT_APP_API_VERSION,
  STAGE: process.env.REACT_APP_API_STAGE,
  ENDPOINT_URL: process.env.REACT_APP_API_ENDPOINT,
  cognito: {
    USER_POOL_ID: process.env.REACT_APP_USER_POOL_ID,
    APP_CLIENT_ID: process.env.REACT_APP_APP_CLIENT_ID
  }
};

