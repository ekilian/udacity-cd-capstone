- Master: [![Build Status](https://travis-ci.org/ekilian/udacity-cd-capstone.svg?branch=master)](https://travis-ci.org/ekilian/udacity-cd-capstone) 
- Stage: [![Build Status](https://travis-ci.org/ekilian/udacity-cd-capstone.svg?branch=stage)](https://travis-ci.org/ekilian/udacity-cd-capstone)


# udacity-cd-capstone

Capstone project for my Udacity Cloud Developer nanodegree.

Rubic requirements that I wanted to fulfil with this project:

1. CI/CD, Github & Code Quality:
   - The project demonstrates an understanding of CI and Github:
     - [x] Project code is stored in a GitHub repository. The project is using Travis-CI as CI tool.
   - The project has a proper documentation:
     - [x] The README file includes introduction how to setup and deploy the project.
     - [ ] It explains the main building blocks.
     - [ ] Has comments in the important files.
   - The project use continuous deployments (CD):
     - [x] Travis-CI is setup to deploy a PROD-Version of the project everytime a pull request is merged into master branch.
        (see: https://github.com/ekilian/udacity-cd-capstone/blob/dev/README.md#cicd-pipeline)

2. Container:
   - Does not apply to this project because it's implemented as a serverless application.

3. Deployment:
   - The application runs on a cluster in the cloud
     - [ ] Does not apply to this project because it's implemented as a serverless application.
   - The app can be upgraded via rolling-update:
     - [x] The students can deploy a new version of the application without downtime
   - A/B deployment of the application
     - [ ] Two versions of the same app can run at the same and service traffic
   - Monitoring:
     - [x] The application is monitored by Amazon CloudWatch (TODO: Screenshot of Cloudwatch linked here)

4. Functionality:
   - The application allows users to create, update, delete items:
     - [ ] A user of the web application with the required role can use the interface to create, edit and delete users.
   - The application allows users to upload a file.
     - [ ] This application does not have a use-case with file upload
   - The application only displays items for a logged in user.
     - [ ]
   - Authentication is implemented and does not allow unauthenticated access.
     - [ ] A user needs to authenticate in order to use an application. Authentication is based on AWS Cognito.

5. Codebase:
   - The code is split into multiple layers separating business logic from I/O related code:
     - [x] Code of Lambda functions is split into multiple files/classes. The business logic of an application is separated from code for database access and code related to AWS Lambda.
   - Code is implemented using async/await and Promises without using callbacks:
     - [x] The project uses async/await constructs to get results of asynchronous operations

6. Best practices:
   - All resources in the application are defined in the "serverless.yml" file
     - [x] All resources needed by an application are defined in the "serverless.yml"
   - Each function has its own set of permissions:
     - [x] Permissions are defined per function in the functions section of the "serverless.yml".
   - Application has sufficient monitoring.
     - [ ] Distributed tracing is enabled/ Sufficient amount of logging / Application level metrics
   - HTTP requests are validated:
     - [ ] Incoming HTTP requests are validated using request validation in API Gateway.

7. Architecture:
   - Data is stored in a table with a composite key.
     - [ ] 1:M relationship is modeled using a DynamoDB table that has a composite key with both partition and sort keys
   - Scan operation is not used to read data from a database.
     - [x] Work schedule is fetched by using the "query()" method.





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
