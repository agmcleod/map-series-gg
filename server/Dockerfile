FROM node:8-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN apk update \
  && apk add ca-certificates wget \
  && update-ca-certificates

WORKDIR /app
RUN mkdir -p /opt
RUN wget https://yarnpkg.com/latest.tar.gz
RUN tar zvxf latest.tar.gz
RUN mv yarn-* /opt/yarn
ENV PATH "$PATH:/opt/yarn/bin"

COPY package.json yarn.lock* .
RUN yarn

EXPOSE 8200
CMD ["yarn", "start"]
