FROM teamparallax/ffmpeg-alpine:1.0.3-rc

ARG host=hock.docker.internal:3000
ENV HOST=$host

WORKDIR /app

ADD . /app

RUN yarn install

CMD [ "yarn", "start" ]