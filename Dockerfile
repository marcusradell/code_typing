FROM node:19
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "node", "build/" ]