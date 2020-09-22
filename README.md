# team-parallax/ffmpeg-webservice

This project provides a webservice with a REST-API for file-conversions using `ffmpeg`.

## Prerequisites

// Tbd

### Usage

You can either build this project from source or use a built docker image.

#### Building from source

If the above mentioned requirements are met one can run the service using the command:

```console
yarn run start
```

##### Build docker image

One can also build the webservice in a `docker` container by using the following command:

```console
# building the container image
yarn run build:docker

# running the container
yarn run start:docker
```

#### Run in Docker

// Tbd

### Swagger API

To see the API-documentation in development-environment one can go to `http://localhost:3000/api-docs`.
