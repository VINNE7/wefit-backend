FROM node:lts-buster-slim AS builder
WORKDIR /src/api


RUN apt-get update -y && apt-get install -y openssl
