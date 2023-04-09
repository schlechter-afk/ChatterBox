FROM node:16.16.0 as build-stage 

WORKDIR /frontend

# ENV PATH=/frontend/node_modules/.bin:$PATH

COPY package.json .
RUN npm install --force
COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "start"]