export const config = {
  AWS_REGION: process.env.REGION,
  BUCKET_NAME: process.env.IMAGES_S3_BUCKET,
  cognito: {
    COGNITO_VERSION: '2016-04-18',
    USER_POOL_ID: process.env.USER_POOL_ID
  },
  dynamoDb: {
    SCHEDULE_TABLE: process.env.SCHEDULE_TABLE,
  }
}