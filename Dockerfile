
FROM node:16-alpine3.15

WORKDIR /etc/buildtheearth/logger-bot

COPY . ./

RUN npm install

ENV NODE_ENV production

ENV FORCE_COLOR 1

ENV IN_DOCKER yes

CMD ["npm", "start"]
