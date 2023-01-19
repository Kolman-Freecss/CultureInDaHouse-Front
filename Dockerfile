FROM node:16.10.0 as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build:ci

FROM nginx:1.17.1-alpine as runner

COPY --from=builder /app/dist/cultureindahouse-front /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
