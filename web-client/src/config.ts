
export default {
  API_VERSION: 'v1',
  apiGateway: {
    REGION: process.env.AWS_REGION,
    ENDPOINT_URL: 'https://hkmzazj0s2.execute-api.us-east-2.amazonaws.com/dev'
  },
  cognito: {
    AWS_REGION: process.env.AWS_REGION,
    USER_POOL_ID: 'us-east-2_sJRdbCIjo',
    APP_CLIENT_ID: '5d2cen3cbc747s44afcpors6bq',
    APP_SECRET: '5a8siqltfmpd3aj0rdm33kll0gqe2j4r56ddrm50a3l9vhraan5',
    LOGIN_ENDPOINT: 'https://hkmzazj0s2.auth.us-east-2.amazoncognito.com/login?client_id=5d2cen3cbc747s44afcpors6bq&response_type=code&scope=profile+openid&redirect_uri=http://localhost:3000/callback',
    AUTH_ENDPOINT: 'https://hkmzazj0s2.auth.us-east-2.amazoncognito.com/oauth2/authorize?redirect_uri=http://localhost:3000/callback&response_type=token&client_id=5d2cen3cbc747s44afcpors6bq',
    TOKEN_ENDPOINT: 'https://hkmzazj0s2.auth.us-east-2.amazoncognito.com/oauth2/token',
    CALLBACK_URL: 'http://localhost:3000/callback'
  }
};

