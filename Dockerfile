FROM alfg/ffmpeg:latest

ARG host
ENV HOST=$host

WORKDIR /app

ADD . /app

RUN apk --no-cache \
    add --update \
    --repository="http://dl-cdn.alpinelinux.org/alpine/edge/community" \
    bash \
    curl \
    jq \
    npm \
    && ffmpeg -buildconf \
    && npm install -g yarn \
	&& yarn install

CMD [ "yarn", "start" ]