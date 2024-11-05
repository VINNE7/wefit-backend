FROM node:lts-buster-slim AS builder
WORKDIR /src/api

COPY package*.json ./

RUN apt-get update -y && apt-get install -y openssl
COPY . .

RUN npm install

EXPOSE 3001