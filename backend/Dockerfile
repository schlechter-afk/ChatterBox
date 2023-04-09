# Dockerfile for backend

FROM node:16.16.0

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4003

CMD ["node", "server.js"]