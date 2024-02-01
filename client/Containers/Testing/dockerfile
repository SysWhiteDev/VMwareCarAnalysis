# Dockerfile
FROM node:21.6.1-alpine

# create destination directory
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /usr/src/nuxt-app/
RUN npm i
RUN npm run build


EXPOSE 6980

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=6980

CMD ["node", ".output/server/index.mjs" ]
