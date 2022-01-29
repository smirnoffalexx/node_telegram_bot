FROM node:latest

RUN apt-get update && mkdir -p usr/src/app
WORKDIR usr/src/app

COPY package.json ./
RUN npm install

COPY . /usr/src/app

CMD ["npm", "start"]
