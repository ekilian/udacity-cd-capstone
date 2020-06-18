# Grifor

Capstone project for my Udacity Cloud Developer nanodegree


## CI/CD Pipeline

The project uses Travis-CI as Continious integration platform.

![Alt text](screenshots/travisci.png?raw=true "Travis CI Build")

### Setup of the Travis CI/CD Pipeline

The following environment variables need to be set for the client:

  * AWS_ACCESS_KEY_ID - The credentials for the AWS account.
  * AWS_SECRET_ACCESS_KEY - The credentials for the AWS account.

  * API_URL - The URL of the API-Gateway endpoint
  * USER_POOL_ID - The Id of the Cognito UserPool.
  * AWS_REGION - The AWS region in which the Cognito UserPool has been defined.
  * APP_CLIENT_ID
