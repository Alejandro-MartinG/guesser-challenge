FROM node:10-alpine

RUN apk update 
RUN apk upgrade 
RUN apk add --no-cache bash git openssh
RUN apk add --update python krb5 krb5-libs gcc make g++ krb5-dev

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./

USER node
RUN npm install

COPY --chown=node:node . .

EXPOSE 5500

CMD [ "npm", "start" ]