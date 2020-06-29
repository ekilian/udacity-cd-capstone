import * as AWS from 'aws-sdk';

import { config } from '../config';


const s3 = new AWS.S3({
    signatureVersion: 'v4'
});

export const getUploadUrl = async (imageId: string):Promise<string> => {
  return s3.getSignedUrl('putObject', {
    Bucket: config.BUCKET_NAME,
    Key: imageId
  });
}
