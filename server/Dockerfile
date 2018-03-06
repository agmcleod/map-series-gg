FROM node:8-alpine

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

RUN apk update \
  && apk add ca-certificates wget \
  && update-ca-certificates

WORKDIR /app
RUN mkdir -p /opt
RUN wget https://yarnpkg.com/latest.tar.gz \
  && tar zvxf latest.tar.gz \
  && mv yarn-* /opt/yarn
ENV PATH "/opt/yarn/bin:$PATH"
