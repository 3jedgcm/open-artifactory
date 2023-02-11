FROM node:alpine as backend
WORKDIR /usr/src/app
COPY ./backend/sources ./sources
COPY ./backend/package.json ./
COPY ./backend/yarn.lock ./
COPY ./backend/tsconfig.json ./
RUN yarn install --frozen-lockfile
RUN npx tsc

FROM node:alpine as frontend
WORKDIR /usr/src/app
COPY ./frontend/src ./src
COPY ./frontend/public ./public
COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:alpine as container
WORKDIR /usr/src/app
COPY --from=backend /usr/src/app/build ./
COPY --from=frontend /usr/src/app/build ./public
COPY ./backend/package.json ./
COPY ./backend/yarn.lock ./
RUN yarn install --frozen-lockfile

EXPOSE 5000
ENTRYPOINT [ "node", "index.js" ]