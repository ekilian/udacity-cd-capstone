import * as AWS from 'aws-sdk';

import { config } from '../config';


const s3 = new AWS.S3({
    signatureVersion: 'v4'
});

/**
 * Gets a signed URL from S3 for uploading a new image to the configured S3 Bucket.
 *
 * @param imageId - The ID of the image
 */
export const getUploadUrl = async (imageId: string):Promise<string> => {
  return s3.getSignedUrl('putObject', {
    Bucket: config.BUCKET_NAME,
    Key: imageId
  });
}
