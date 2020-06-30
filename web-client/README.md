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

### Install (deploy) automatically

For automatic deployment of the web-frontend, the project uses the Serverless Framework together with the serverless-finch plugin.
Just configure the CI/CD platform to user the provided serverless.yml file.


## Use cases

### Work schedule

This view is for planing the work schedule for a given month. It provides a calendar of the choosen month. Every day is seperated in 3 shifts, morning, afternoon and night.
Every user with the role *Office* can change the schedule for the choosen month.
Only the current and future month can be changed. The schedule for past month is locked for editing and can only be viewed for reviewing.

On the right side of the calendar there is a list of all active **Worker** configured in the system. To plan out the work schedule just drag a worker over the day of your choice and drop it over the desired shift.

A user with the role *Worker* can only see the work schedule for the current and the upcoming month.


![Work Schedule](../screenshots/schedule.gif?raw=true "Planing the work schedule")


### Works Reports

This view presents a chart view of a planed work schedule. A user with the role *Office* can choose a month and gets a bar chart showing the amount of hours that a specific worker has been planed. Currently the system counts with 8-hour shifts.

This view is not accessible by a user that owns the role *Worker*.


### Employees

This view is for the user management.

A user with the role *Office* can create, edit or delete a user. It is also possible to upload a photo for every user profile.
The data maintained in this view is also necessary for the work schedule planing. Because only users with the role *Worker* can be part of the work schedule.

A user with the role *Worker* can only view his own profile. HE can also upload a photo to his profile but not edit any information.
