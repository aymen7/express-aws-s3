FROM node:14.17.0-alpine

WORKDIR /usr/app

COPY . .

RUN ["npm", "install"]

CMD [ "npm", "run", "prod"]