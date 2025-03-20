FROM node:20-alpine

ARG APP_ENVIRONMENT
ARG APP_PORT

ENV NODE_ENV=$APP_ENVIRONMENT
ENV PORT=$APP_PORT

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./statics ./statics
COPY tsconfig.json ./

RUN if [ "$APP_ENVIRONMENT" = "production" ]; then \
      npm run build && \
      rm -r ./src && \
      rm ./tsconfig.json && \
      rm ./package*.json; \
    fi

EXPOSE ${APP_PORT}

CMD ["/bin/sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else node dist/src/server.js; fi"]
