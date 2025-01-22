FROM node:16-alpine

ARG APP_ENVIRONMENT
ARG APP_PORT

WORKDIR /home/node/app/dominos-service

COPY ./src ./src
COPY ./statics ./statics
COPY package*.json ./
COPY tsconfig.json ./

RUN npm i

RUN npm run build

EXPOSE ${APP_PORT}

RUN rm -r ./src
RUN rm ./tsconfig.json
RUN rm ./package*.json

CMD [ "node", "dist/src/server.js" ]
