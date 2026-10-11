FROM node:22-alpine AS gallery
WORKDIR /app
COPY templates/ ./templates/
COPY scripts/build-gallery.mjs ./scripts/build-gallery.mjs
RUN node scripts/build-gallery.mjs

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=gallery /app/gallery-dist/ /usr/share/nginx/html/
COPY --from=gallery /app/templates/ /usr/share/nginx/html/examples/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
