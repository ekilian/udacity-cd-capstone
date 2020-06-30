## Installation

You can easily install your own version of the backend.

All resources and services of the AWS cloud are provisioned with the help of the Serverless Framework.
You just need to meet the following prerequisites:

  * AWS Account (can be a free tier account)
  * AWS Credentials need to be configured on the local system
  * Local installation of nodejs (version 12 or higher)

You can check this by running the following commands:
  ```
  node --version
  ```

To setup the backend, just follow these steps:

  1. Clone the GitHub repository to your local filesystem.
  2. Go to folder ..\udacity-cd-capstone\backend
  3. Run the following commands:
  ```
  npm install
  serverless deploy -v
  ```



### Install (deploy) automatically

For automatic deployment of the backenn, the project uses the Serverless Framework.
Just configure the CI/CD platform of your choice to use the provided serverless.yml file.
