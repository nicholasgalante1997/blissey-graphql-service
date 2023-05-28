FROM node:19.0.0-buster-slim

RUN mkdir -p /app/services/blissey

WORKDIR /app/services/blissey 

COPY . . 

RUN yarn install

RUN yarn build 

RUN rm -rf \
    node_modules/ \
    src/ \
    tsconfig.json \
    yarn.lock \
    webpack.prod.js \
    .babelrc \
    .env

RUN yarn install --production

EXPOSE 4000 

CMD ["yarn", "start"]