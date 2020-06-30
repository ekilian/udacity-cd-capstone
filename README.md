# udacity-cd-capstone

Capstone project for my Udacity Cloud Developer nanodegree.

This project implements an application for planing the work schedule of your workers.
It uses the following services of the AWS-Cloud:

  * AWS Lambda - For the functions implemented in the backend
  * API Gateway - For the HTTP Endpoints
  * AWS Cognito - For authorization and as a datastore for the user management system.
  * DynamoDB - As database for the work schedules planed with the application.

  * React - As framework for the web-frontend

The details about the implemented uses cases can be found in the [README.md](https://github.com/ekilian/udacity-cd-capstone/tree/master/web-client/README.md) of the web client.


## CI/CD-Pipeline

The project uses Travis-CI as platform for continious integration/continious delivery.

The CI/CD pipeline is based on two branches from the GitHub repository: Stage and Master

The CI/CD pipeline is defined like this:
  - On every pull request to one of these branches, Travis-CI builds the project (frontend and backend) and runs tests (if available).
  - On every push to **Stage** the project is build and deployed to stage *dev*.
  - On every push to **Master** the project is build and deployed to stage *prod*.

Details abaout the configuration can be found in the configuration file [.travis.yml](https://github.com/ekilian/udacity-cd-capstone/blob/master/.travis.yml).


![Alt text](screenshots/travisci.png?raw=true "Travis CI Build")


### Setting up the Travis CI/CD Pipeline

For setting up the CI/CD pipeline used in this project, you need the following prerequisites:

  - GitHub account and a repository
  - Travis-CI account
  - AWS Account

The following environment variables need to be defined in Travis-CI:

1. For deployment to AWS:
  * AWS_ACCESS_KEY_ID - The Access key for your AWS account.
  * AWS_SECRET_ACCESS_KEY - The Secret for accessing your AWS account.

2. For Frontend build:
  * REACT_APP_API_ENDPOINT - The URL of the API-Gateway endpoint
  * REACT_APP_API_STAGE - The stage (e.g. dev or prod)
  * REACT_APP_API_VERSION - The currently used version of the API.
  * REACT_APP_USER_POOL_ID - The Id of the Cognito UserPool.
  * REACT_APP_APP_CLIENT_ID - The Client-Id of the Cognito UserPool
  * REACT_APP_AWS_REGION - The AWS region in which the Cognito UserPool has been defined.

---------------------------------

## Rubic requirements that I wanted to fulfil with this project:

1. CI/CD, Github & Code Quality:
   - The project demonstrates an understanding of CI and Github:
     - [x] Project code is stored in a GitHub repository. The project is using Travis-CI as CI tool.
   - The project has a proper documentation:
     - [x] The README file includes introduction how to setup and deploy the project.
     - [ ] It explains the main building blocks.
     - [x] Has comments in the important files.
   - The project use continuous deployments (CD):
     - [x] Travis-CI is setup to deploy a PROD-Version of the project everytime a pull request is pushed to **master**.
        [Description of CI/CD](#CI/CD-Pipeline)

4. Functionality:
   - The application allows users to create, update, delete items:
     - [x] A user of the web application, with the required role, can use the interface to create, edit and delete users.
   - The application allows users to upload a file.
     - [x] A user can upload a file to his profile in the user management
   - The application only displays items for a logged in user.
     - [x] The application only displays information to logged-in users. What kind of information is determined by the role of the logged in user.
   - Authentication is implemented and does not allow unauthenticated access.
     - [x] Authentication is implemented with AWS Cognito.

5. Codebase:
   - The code is split into multiple layers separating business logic from I/O related code:
     - [x] Code of Lambda functions is split into multiple files/classes. The business logic of the application is separated from code for database access, access to AWS Cognito and code related to AWS Lambda.
   - Code is implemented using async/await and Promises without using callbacks:
     - [x] The project uses async/await constructs

6. Best practices:
   - All resources in the application are defined in the "serverless.yml" file
     - [x] All resources needed by an application are defined in the "serverless.yml"
   - Each function has its own set of permissions:
     - [x] Permissions are defined per function in the functions section of the "serverless.yml".
   - Application has sufficient monitoring.
     - [x] Sufficient amount of logging / Application level metrics collected by AWS CloudWatch
   - HTTP requests are validated:
     - [x] The body of an request is validated by API Gateway. Path parameters are validated in the Lambda function

7. Architecture:
   - Data is stored in a table with a composite key.
     - [x] 1:M relationship is modeled using a DynamoDB table that has a composite key with both partition and sort keys
   - Scan operation is not used to read data from a database.
     - [x] Work schedule is fetched by using the "query()" method.
