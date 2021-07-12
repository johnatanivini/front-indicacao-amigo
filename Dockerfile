FROM node:16

RUN npm install -g npm@7.19.1
RUN npm install -g pm2

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 3000

CMD ["pm2","--name HelloWorld start npm -- start"]

