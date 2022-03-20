FROM node:16.14.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install --silent

RUN npm install -g sequelize-cli

RUN npm install -g sequelize

RUN npm install -g mysql2

RUN npm install -g nodemon

RUN npm install fastest-validator --save

RUN npm install jsonwebtoken --save

EXPOSE 3000