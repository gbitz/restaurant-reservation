# Restaurant Reservation Scheduler

Live Deployment: [https://reservation-scheduler-app.herokuapp.com/dashboard]

## Application Uses

This app allows users/restaurants to create and manage reservations for a restaurant. The user is able to create tables and their capacity and then seat reservations at tables.  The reservations can be managed based on cancellations, seating at a table, and finishing the reservations.  Finishing a reservation also clears the table.  

## Technologies Used

* HTML
* React
* Node.js
* Express
* Knex
* Bootstrap


## Functionality Examples 

![Alt text](https://lh3.googleusercontent.com/Ys4uwwl6Gp_smVaYebYEs8hoY2MAskUvYToufT_ueFtLB32DMmEMSET9xF6z5R4Y9LL-ZRWHZsmkZRIUQl7fIirfxwhuUZJDm5X9nAf87bAgyMfUwY-p3BR-iDPAQFDGkfsHqsYILXyI0URAVVh_a_EWzx2x6ATs6uSaQe5j_H4qn8CZQWl5DRUV6GBUFNi39Z4WjQarP95b-kKRmrLvQ5EN0-eOu6OHN9_TmNQO9rxsqN7OVVkeZrZbPOH7iGjRH4qBq_MvujXXAk3GyUCwyAADMMNstcjNOTFSN_hlbHgfmb5myXubxwipfOVyS7qS3XK4IixQQUEec6acyy3JR4N1su8ZqkqA5oNV7VQTUf8z0tiTE8lYQAq-0oJ_gnuAxfh93i3cdsnYqYnqLQPMj5moHaCvTp8Evq-k6yuwRVK2cQV2rmAWRfLnyyZvp6pl-vZ1yJpyNLm56sJ4PN6IojkiiQ7RAY4TIVd6KXQT1KLZTmcgbbwCz4NSMhvu6lvgNcjyQenZWHcDbP1H4SGWmGYcrjCHIprauB5JUIq5pwzVS7gHbGMnXM8f6P9ylexYg0zgcwNTfjA7tG7ybPaQVHHVkTYbFLeAX2uPQLuf2jNEfZkM51OW5CUAb-yvBO7x5olPf6co5_jhiheho-ApB7UBIcpZwGHGWsfKsjnzqhF6yU3rG3KwaCoZTZV2DmFbR5WEQDb16sMTVQ9T6GMceoZBmh50ZwBDCwlAtjwM1mw5HKtikPIMFMR64EU=w1920-h1080-no?authuser=0 "Optional title")

## Database setup

1. Set up four new ElephantSQL database instances - development, test, preview, and production - by following the instructions in the "PostgreSQL: Creating & Deleting Databases" checkpoint.
1. After setting up your database instances, connect DBeaver to your new database instances by following the instructions in the "PostgreSQL: Installing DBeaver" checkpoint.

### Knex

Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.


## Running tests

This project has unit, integration, and end-to-end (e2e) tests. You have seen unit and integration tests in previous projects.
End-to-end tests use browser automation to interact with the application just like the user does.
Once the tests are passing for a given user story, you have implemented the necessary functionality.

Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.

Whenever possible, frontend tests will run before backend tests to help you follow outside-in development.

> **Note** When running `npm run test:X` If the frontend tests fail, the tests will stop before running the backend tests. Remember, you can always run `npm run test:X:backend` or `npm run test:X:frontend` to target a specific part of the application.

Once you have all user stories complete, you can run all the tests using the following commands:

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.

If you would like a reminder of which npm scripts are available, run `npm run` to see a list of available commands.

Note that the logging level for the backend is set to `warn` when running tests and `info` otherwise.