FROM node:22-alpine AS build

WORKDIR /app
COPY templates/ ./templates/
WORKDIR /app/templates/react-ui
RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/templates/react-ui/dist/ /usr/share/nginx/html/
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
