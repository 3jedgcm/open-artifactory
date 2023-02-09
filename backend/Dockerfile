FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:alpine
ENV PORT=80
ENV FILES_PATH="/usr/src/app/data/files"
ENV DATABASE_PATH="/usr/src/app/data/open-artifactory.db"
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY --from=builder /usr/src/app/build ./build
EXPOSE $PORT/tcp
ENTRYPOINT [ "node", "build/index.js" ]
