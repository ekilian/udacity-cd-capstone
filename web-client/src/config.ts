
export default {
  apiGateway: {
    REGION: process.env.AWS_REGION,
    ENDPOINT_URL: 'https://hkmzazj0s2.execute-api.us-east-2.amazonaws.com/dev'
  },
  cognito: {
    AWS_REGION: process.env.AWS_REGION,
    USER_POOL_ID: 'us-east-2_sJRdbCIjo',
    APP_CLIENT_ID: process.env.APP_CLIENT_ID,
    APP_SECRET: process.env.APP_SECRET
  }
};

