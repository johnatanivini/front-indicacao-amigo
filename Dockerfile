FROM node:16

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install --silence

COPY . ./

CMD ["npm","start"]

EXPOSE 3000

