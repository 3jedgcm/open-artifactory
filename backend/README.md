# Open artifactory backend

Open source artifactory backend.

This project is part of Open artifactory project : [Github](https://github.com/3jedgcm/open-artifactory)

It based on Nodejs with Express framework and is developed in Typescript.

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

| Variable name    | Type      | Description                                           | Default value            |
|------------------|-----------|-------------------------------------------------------|--------------------------|
| `PORT`           | `Integer` | Network port for webserver                            | `5000`                   |
| `BASE_URL`       | `String`  | Public base URL used to serve webserver               | `http://localhost:5000/` |
| `FILES_PATH`     | `String`  | Folder path (relative or absolute) to store files     | `files`                  |
| `DATABASE_PATH`  | `String`  | File path (relative or absolute) of SQLite 3 database | `open-artifactory.db`    |
| `MAX_FILE_SIZE`  | `Integer` | Max size of a file (in bytes)                         | `Infinity`               |
| `ADMIN_LOGIN`    | `String`  | Username of administrator                             | `admin`                  |
| `ADMIN_PASSWORD` | `String`  | Password of administrator                             | `admin`                  |

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
docker run -l open-artifactory -e BASE_URL=http://localhost:5000/ -p 80:5000 3jedgcm/open-artifactory
```

#### Environment Variables

Same as describe before : [Environment variables](#environment-variables)

Some default values changed :

* `PORT` : `80`
* `FILES_PATH` : `/usr/src/app/data/files`
* `DATABASE_PATH` : `/usr/src/app/data/open-artifactory.db`

#### Volumes

* `/usr/src/app/data` : Keep database and files in a volume (based on `FILES_PATH` and `DATABASE_PATH` environment
  variables)

#### Ports

* `80/tcp` : HTTP server port (Based on `PORT` variable).

## License

This project is licensed under the MIT License - see the [LICENSE.md](../LICENSE.md) file for details.
