FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY frontend/package*.json frontend/
COPY backend/package*.json backend/

RUN npm ci --ignore-scripts

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm","start"]
