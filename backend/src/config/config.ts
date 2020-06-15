export const config = {
  AWS_REGION: process.env.AWS_REGION,
  cognito: {
    API_VERSION: '2016-04-18',
    USER_POOL_ID: process.env.USER_POOL_ID
  }
}