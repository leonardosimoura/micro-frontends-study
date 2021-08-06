FROM node:14-buster  as node
WORKDIR /app
COPY package.json /app/
RUN yarn --silent
COPY ./ /app/
ARG env=prod
RUN yarn build

FROM nginx
COPY --from=node /app/dist /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf  