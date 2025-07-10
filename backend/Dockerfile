# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Nur package.json + lockfile kopieren, dann Dependencies installieren
COPY package.json package-lock.json ./
RUN npm ci

# Rest kopieren & bauen
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app

# Prod-Dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Gebauten Code übernehmen
COPY --from=builder /app/dist ./dist

EXPOSE 5000
CMD ["node", "dist/index.js"]
