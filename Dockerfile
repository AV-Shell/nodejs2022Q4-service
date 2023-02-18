FROM node:18.14-alpine3.16
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ ./
EXPOSE ${PORT}
CMD ["npm", "run", "docker"] 