## Installation

### Install local

To install and run the web-frontend locally, your system must meet the following prerequisites:

  * Local installation of Git
  * Local installation of nodejs (version 12 or higher)

You can check this by running the following commands:
    ```
    git --version
    node --version
    ```

To install and run the web-frontend locally, just follow these steps:

  1. Clone the GitHub repository to your local filesystem.
  2. Go to folder ..\udacity-cd-capstone\web-client
  3. Set the environment variables defined in the file set_env.sh.
      ```
      source set_env.sh
      ```
     If you run your own installation of the backend, then you must set the variables in the script to the values of your serverless backend.
     You can easily collect all necessary values from the output of the serverless deploy run.

  4. Install the node packages and start the web-client locally
      ```
      npm install
      npm start
      ```

### Install (deploy) automaticly

For automatic deployment of the web-frontend, the project uses the Serverless Framework together with the serverless-finch plugin.



## Use cases

### Planing of work schedule

![Work Schedule](../screenshots/schedule.gif?raw=true "Planing the work schedule")