This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This project contains an example project board meant to showcase how one can be used. The issues posted to it are not real issues.

#### _**IMPORTANT NOTE**_ -

This project does not have a mongoDB connection setup. For:

- local development: create a config file (make sure to name it config.js) in the config folder, which exports your db.uri connection. An example is provided, config/config.example.js. This file will be ignored by git so your db credentials will be kept safe when the app is deployed.
- production: Since the config file is not pushed when you deploy your app, you must specifiy your db uri in heorku. Set the uri in heroku as specified in [this](https://devcenter.heroku.com/articles/config-vars) resource. Make sure you name the environement variable "DB_URI".

## Getting Started

This repository aims to assist you in beginning work on a MERN stack application with a solid file structure as a foundation. To get started make a copy of this template repo for your project teams.

Since this project will hold both the client application and the server application there will be node modules in two different places. First run `npm install` from the root. After this you will run `npm run-script install-all` from the root. From now on run this command anytime you want to install all modules again. This is a script we have defined in package.json .

This app can be deployed directly to heroku since there is a script defined in package.json which will automatically handle building and deploying the app. For more information on deploying to heroku reference the extra resources at the bottom of this file.

## File structure

#### `client` - Holds the client application

- #### `public` - This holds all of our static files
- #### `src`
  - #### `assets` - This folder holds assets such as images, docs, and fonts
  - #### `components` - This folder holds all of the different components that will make up our views
  - #### `views` - These represent a unique page on the website i.e. Home or About. These are still normal react components.
  - #### `App.js` - This is what renders all of our browser routes and different views
  - #### `index.js` - This is what renders the react app by rendering App.js, should not change
- #### `package.json` - Defines npm behaviors and packages for the client

#### `server` - Holds the server application

- #### `config` - This holds our configuration files, like mongoDB uri
- #### `controllers` - These hold all of the callback functions that each route will call
- #### `models` - This holds all of our data models
- #### `routes` - This holds all of our HTTP to URL path associations for each unique url
- #### `tests` - This holds all of our server tests that we have defined
- #### `server.js` - Defines npm behaviors and packages for the client

#### `package.json` - Defines npm behaviors like the scripts defined in the next section of the README

#### `.gitignore` - Tells git which files to ignore

#### `README` - This file!

## Available Scripts

In the project directory, you can run:

### `npm run-script dev`

Runs both the client app and the server app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script client`

Runs just the client app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view the client in the browser.

### `npm run-script server`

Runs just the server in development mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

If deploying to heroku this does not need to be run since it is handled by the heroku-postbuild script<br>

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

Heroku information [Heroku NodeJS info](https://www.heroku.com/nodejs).

To learn how to setup a local MongoDB instance for testing, check out how to [Connect to MongoDB](https://docs.mongodb.com/guides/server/drivers/).

To learn how to deploy a full-stack web app to heroku, check out [this great guide](https://daveceddia.com/deploy-react-express-app-heroku/).

To learn React, check out the [React documentation](https://reactjs.org/).

To learn Express, go to the [Express website](https://expressjs.com/).

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Creating branches

We will be creating branches off of the `develop` branch and saving `master` for releases.
Our feature branches should follow the style `feature/name-of-branch` where name-of-branch is something descriptive and short.
A quick fix to a bug can follow the style `hotfix/name-of-fix`
Please do not work directly on your local version of the develop or master branches. Create your own branch instead, even if there's only one line of code to commit.
Remember to push your branches to the remote repository often (every time you work on the project). This saves us from losing code due to hardware failure and facilitates collaboration on features.

### Pull requests

Once work on a branch is complete, create a [pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request). Assign it to Regan (oreganoregano). Usually the base repository you'll be using is `develop`

## Deployed Project

The deployed project can be found at [this link](https://github.com/CEN3031Group2F19/aging-parents).

## APIs Used

### Passport

Passport is an authentication module perfect for Node.js. We used it to store salted and hashed passwords in our database rather than plaintext passwords. Passport was our all-around password middleware, taking the complicated hash functions out of our equation. [More here](http://www.passportjs.org/).

### JSON Web Token

JWT is a module that allowed us to store a token representing a user authentication. The token was used on the front end to limit access to pages to logged in users. In the future, it can be used to verify the identity of a user when making requests to the back end. [More here](https://jwt.io/).

### Nodemailer

We used Nodemailer alongside Passport to send emails to users who forgot their passwords. It requries the use of an outside email provider, like Gmail, to actually send the mail. The account credentials need to be provided in `server/config/config.js` as `gmail.email` and `gmail.password`. [More here](https://nodemailer.com/about/).

### Semantic UI

This User Interface framework is a fantastic way to easily build intuitive UI. We used the framework throughout the front end to build out buttons, text boxes, forms, and other elements. [More here](https://react.semantic-ui.com/).

### Axios

Axios is a popular HTTP client used to make requests. We used it in our React app to make requests to our Node back end.

## Project Features

### Home page

![Home page](./public/home.png?raw=true "Home")
This is the home page with links to all the other features.

### Notes

![Notes Page](./public/notes.png?raw=true "Notes")
Users can add, delete, and view notes here.

### Daily Tasks

![Daily Tasks Page](./public/dailytasks.png?raw=true "Daily Tasks")
Users can add, complete, delete, and view daily tasks here.

### Calendar

![Calendar Page](./public/calendar.png?raw=true "Calendar")
Users can add, delete, and view appointments or events on the calendar.

### Timesheet

![Timesheet Page](./public/timesheet.png?raw=true "Timesheet")
Users clock in and out here. Users can also see the time cards of other workers and filter the view. This page has an open issue because it does not work as intended.

### Medication

![Medication Page](./public/medications.png?raw=true "Medication")
Users can add medications and view all medications here.

## Run the project

### Locally

Clone the repository and add `server/config/config.js` to the project folder. You should have values for `db.uri` (your URI for MongoDB Atlas), `gmail.email` (your email username for sending forgotten passwords), and `gmail.password`. Then, in a terminal run `npm run client && npm run server`

### Heroku

Follow the steps described above to deploy to Heroku, then define the following variables in the Heroku settings for the app: `SERVER_URI` (https://aging-parent-care.herokuapp.com/), `DB_URI`, `RECOVERY_EMAIL`, and `RECOVERY_PASSWORD`.
