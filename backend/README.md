# Open artifactory backend

Open source artifactory backend.

This project is part of Open artifactory project : [Github](https://github.com/3jedgcm/open-artifactory)

It based on Nodejs with Express framework and is developed in Typescript.

It provides a `/login` route to log in with an OTP app (as Google Authenticator) and use a Bearer token to secure others
routes

The download access is not restricted

A Open API V3 spec file is provided. it is available here : [`generated/swagger.json`](generated/swagger.json)

> Please change the `JWT_SECRET` variable before use

## Getting Started

To run this backend, you need NodeJS and Yarn (classic):

* [NodeJS website](https://nodejs.org/en/)
* [Yarn classic installation page](https://classic.yarnpkg.com/en/docs/install#windows-stable)

After installing tools, you can run :

```shell
yarn install
yarn dev
```

## Environment variables

This backend allow to define some parameters with environment variables :

| Variable name         | Type      | Description                                                                    | Default value                       |
|-----------------------|-----------|--------------------------------------------------------------------------------|-------------------------------------|
| `PORT`                | `Integer` | Network port for webserver                                                     | `5000`                              |
| `BASE_URL`            | `String`  | Public base URL used to serve webserver                                        | `http://localhost:5000/`            |
| `FILES_PATH`          | `String`  | Folder path (relative or absolute) to store files                              | `files`                             |
| `DATABASE_PATH`       | `String`  | File path (relative or absolute) of SQLite 3 database                          | `open-artifactory.db`               |
| `OTP_SERVICE_NAME`    | `String`  | Service name for OTP tools (Like Google Authenticator)                         | `open-artifactory`                  |
| `OTP_SECRET_PATH`     | `String`  | File path (relative or absolute) to store OTP secret (Generated if not exists) | `data/open-artifactory.otp.secrety` |
| `JWT_SECRET`          | `String`  | JWT secret for Bearer token sign (TO BE CHANGED !)                             | `open-artifactory-secret`           |
| `JWT_EXPIRATION_TIME` | `String`  | JWT token expiration time in seconds or with unit (ex `60` or `1h` or `2 days` | `20m` (20 minutes)                  |
| `STORAGE_LIMIT`       | `Integer` | Limit size of file storage in bytes (Negative value equals no limit)           | `-1` (No limit)                     |

## Docker

These instructions will cover usage information and for the docker container

### Prerequisities

In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

#### Container

```shell
docker pull 3jedgcm/open-artifactory
docker run -l open-artifactory -e JWT_SECRET=MY_JWT_SECRET  -e BASE_URL=http://localhost:5000/ -p 5000:5000 3jedgcm/open-artifactory
```

#### Environment Variables

Same as describe before : [Environment variables](#environment-variables)

Some default values changed :

* `FILES_PATH` : `/usr/src/app/data/files`
* `DATABASE_PATH` : `/usr/src/app/data/open-artifactory.db`
* `OTP_SECRET_PATH` : `/usr/src/app/data/open-artifactory.otp.secret`

#### Volumes

* `/usr/src/app/data` : Keep database and files in a volume (based on `FILES_PATH` and `DATABASE_PATH` environment
  variables)

#### Ports

* `5000/tcp` : HTTP index port (Based on `PORT` variable).

## License

This project is licensed under the MIT License - see the [LICENSE.md](../LICENSE.md) file for details.
