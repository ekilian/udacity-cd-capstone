
export default {
  apiGateway: {
    REGION: process.env.AWS_REGION,
    URL: 'https://9p7yxdxieh.execute-api.us-east-2.amazonaws.com/dev'
  },
  cognito: {
    AWS_REGION: process.env.AWS_REGION,
    USER_POOL_ID: 'us-east-2_kwBneZOcU',
    APP_CLIENT_ID: process.env.APP_CLIENT_ID
  }
};

