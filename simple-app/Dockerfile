FROM node:lts-alpine

ENV BACKEND_SOURCE_ROOT = ""
ENV API_PORT = ""
ENV DB_HOST = ""
ENV DB_PORT = ""
ENV DB_NAME = ""
ENV DB_USER = ""
ENV DB_PASSWORD = ""
ENV RSA_PUBLIC = ""
ENV RSA_PRIVATE = ""
ENV JWT_SECRET = ""

VOLUME [ "/app" ]

WORKDIR /app

RUN apk update
RUN apk add git bash

ENTRYPOINT ["bash","./init.sh"]
