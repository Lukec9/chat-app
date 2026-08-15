# Stage 1: build the frontend
FROM node:24-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# Stage 2: backend, serving frontend's built static files
FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY backend/ ./backend/

COPY --from=frontend-build /app/frontend/dist ./frontend/dist

EXPOSE 5000
CMD ["node", "backend/server.js"]