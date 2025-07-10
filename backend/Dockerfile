FROM node:18-alpine AS builder
WORKDIR /app

# Dependencies installieren
COPY package.json package-lock.json ./
RUN npm ci

# Deinen Quellcode kopieren
COPY . .

# EXEC-Bit für tsc setzen
RUN chmod +x ./node_modules/.bin/tsc

# Jetzt läuft der Build durch
RUN npm run build

# … Rest deiner Multi-Stage-Konfiguration …
