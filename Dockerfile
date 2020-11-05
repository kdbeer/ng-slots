# stage 1

FROM node:alpine AS build_base
RUN apk add --no-cache git

# Set the Current Working Directory inside the container
WORKDIR /app/workspace

COPY . .
RUN npm ci && npm run build:ssr

# stage 2

FROM nginx:alpine
COPY --from=my-app-build /app/dist/app-to-run-inside-docker /usr/share/nginx/html
EXPOSE 80
