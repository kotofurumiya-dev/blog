FROM node:18-slim as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build && rm -rf node_modules

FROM gcr.io/distroless/nodejs:18

WORKDIR /app
COPY --from=builder /app /app

CMD ["build/serve.js"]