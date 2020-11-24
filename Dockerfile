FROM teamparallax/ffmpeg-alpine:1.0.3-rc

ARG host
ENV HOST=$host

WORKDIR /app

ADD . /app

RUN yarn install

CMD [ "yarn", "start" ]