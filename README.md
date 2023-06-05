<h1 align="left">Used Car Pricing API using NestJS <img src="https://nestjs.com/img/logo-small.svg" width="35" alt="Nest Logo" />

</h1>

<p align="left">Nest is a progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

API and database to help evaluate good prices of used cars for either buying or selling.

### Functionalities

- User can sign up with email/password
- Users can get and estimate for how much their car is worth based on the make/model/year/mileage
- Users can report what they sold their vehicles for
- Admins have to approve reported sales

| **Method & Route**  | **Body or Query String**                                      | **Description**                                  |
| ------------------- | ------------------------------------------------------------- | ------------------------------------------------ |
| `POST` /auth/signup | Body - {email, password}                                      | Create a new user and sign in                    |
| `POST` /auth/signin | Body - {email, password}                                      | Sign in as existing user                         |
| `GET` /reports      | QS - make, model, year, mileage, longitude, latitude, price   | Get an estimate for the car value                |
| `POST` /reports     | Body-{make, model, year, mileage, longitude, latitude, price} | Report how much a vehicle sold for               |
| `PATCH` /reports:id | Body-{approved}                                               | Approve or reject a report submitted by the user |

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

This project is currently developed and maintained by me. I plan to make this more functional and heartily support any issue submission or PR to the project. Thank you!

## Stay in touch

- Author - [Azaz Ahamed](https://azazahamed.com)
- Website - [https://azazahamed.com](https://azazahamed.com)
<!-- - Twitter - [@nestframework](https://twitter.com/nestframework) -->

## License

Nest is [MIT licensed](LICENSE).
