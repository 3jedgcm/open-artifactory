# Open artifactory

Open artifactory is an open-source software for file and artifact management.

<img src="https://raw.githubusercontent.com/3jedgcm/open-artifactory/main/.res/image.png" alt="image" width="400"/>

## Getting Started

These instructions will cover usage information and for the docker container

### Prerequisities

In order to run this container you'll need docker installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

### Usage

#### Container

```shell
docker pull 3jedgcm/open-artifactory:latest
```

#### Environment Variables

* `PORT` - Expose port
* `BASE_URL` - Expose base url (Provide external url, used to generate links)
* `OTP_SERVICE_NAME` - OTP service name
* `JWT_SECRET` - JWT Secret
* `STORAGE_LIMIT` - Storage open artifactory limit

> Please change the `JWT_SECRET` variable before use

#### Volumes

* `/usr/src/app/data` - Upload folder

#### Useful File Locations

* `/usr/src/app/open-artifactory.db` - Database
* `/usr/src/app/open-artifactory.otp.secret` - One-Time Password secret

## Find Us

* [GitHub](https://github.com/3jedgcm/open-artifactory)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull
requests to us.

## Authors

* **3jedgcm** - *Initial work* - [3jedgcm](https://github.com/3jedgcm)
* **Ainorte** - *Leading contributor* - [Ainorte](https://github.com/Ainorte)

See also the list of [contributors](https://github.com/3jedgcm/open-artifactory/contributors) who
participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
