FROM node:8-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /app
RUN npm install -g yarn

RUN set -ex; \
  if [ "$NODE_ENV" = "production" ]; then \
    yarn install --no-cache --frozen-lockfile --production; \
  elif [ "$NODE_ENV" = "test" ]; then \
    touch yarn-error.log; \
    mkdir -m 777 build; \
    yarn install --no-cache --frozen-lockfile; \
    chown -R node:node node_modules package.json yarn.lock yarn-error.log; \
  else \
    touch yarn-error.log; \
    mkdir -p -m 777 node_modules /home/node/.cache/yarn; \
    chown -R node:node node_modules package.json yarn.lock yarn-error.log /home/node/.cache/yarn; \
  fi;

EXPOSE 8200
USER node
CMD ["yarn start"]
