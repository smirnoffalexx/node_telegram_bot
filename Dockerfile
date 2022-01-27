FROM node:latest


RUN apt-get update && mkdir -p usr/src/app
WORKDIR usr/src/app

COPY package.json ./