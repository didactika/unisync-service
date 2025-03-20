FROM node:20-alpine

ARG APP_ENVIRONMENT
ARG APP_PORT

ENV NODE_ENV=${APP_ENVIRONMENT}
ENV PORT=${APP_PORT}

WORKDIR /home/node/app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

RUN npm install -g typescript

COPY . .

RUN if [ "$NODE_ENV" = "production" ]; then \
      npm run build && \
      rm -r ./src && \
      rm ./tsconfig.json; \
    fi

EXPOSE ${PORT}

CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else node dist/src/server.js; fi"]
