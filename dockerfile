# -----------------------------
# STAGE 1: BUILD
# -----------------------------
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

# -----------------------------
# STAGE 2: RUN (PROD)
# -----------------------------
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["node", "index.js"]
