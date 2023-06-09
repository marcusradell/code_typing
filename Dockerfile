FROM node:19
WORKDIR /usr/src/app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["/bin/sh", "scripts/docker-start.sh"]
