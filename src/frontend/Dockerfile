FROM node:16-slim

WORKDIR /frontend

COPY package.json package-lock.json ./

RUN npm install

RUN npm install @vue/cli@4.5.8 -g

COPY . .

CMD ["npm", "run", "serve"]
