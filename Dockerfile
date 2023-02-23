FROM node:alpine as backend
WORKDIR /usr/src/app
COPY ./backend/sources ./sources
COPY ./backend/package.json ./
COPY ./backend/yarn.lock ./
COPY ./backend/tsconfig.json ./
COPY ./backend/tsoa.json ./
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:alpine as frontend
WORKDIR /usr/src/app
COPY ./frontend/src ./src
COPY ./frontend/public ./public
COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:alpine as container
ENV FILES_PATH="/usr/src/app/data/files"
ENV DATABASE_PATH="/usr/src/app/data/open-artifactory.db"
ENV OTP_SECRET_PATH="/usr/src/app/data/open-artifactory.otp.secret"
WORKDIR /usr/src/app
COPY --from=backend /usr/src/app/builds ./
COPY --from=frontend /usr/src/app/builds ./public
COPY ./backend/package.json ./
COPY ./backend/yarn.lock ./
RUN yarn install --production

EXPOSE 5000
ENTRYPOINT [ "node", "index.js" ]
