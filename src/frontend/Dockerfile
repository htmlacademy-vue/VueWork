FROM node:10-slim

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install

RUN npm install @vue/cli@4.3.0 -g

COPY . .

CMD ["npm", "run", "serve"]
