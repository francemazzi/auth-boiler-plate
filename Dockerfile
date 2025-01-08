FROM node:18-bullseye-slim

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y openssl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

COPY package*.json ./
COPY tsconfig.json ./
COPY prisma ./prisma/

RUN npm install

RUN npm run prisma:generate

COPY . .

RUN mkdir -p /usr/src/app/dist/infrastructure/http/public && \
    cp -r /usr/src/app/src/infrastructure/http/public/* /usr/src/app/dist/infrastructure/http/public/

EXPOSE 8080

CMD ["npm", "run", "dev"] 