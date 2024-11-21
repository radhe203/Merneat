FROM node:20-alpine AS build
WORKDIR /app
COPY . .
WORKDIR /app/server

ENV VITE_API_DEV_URL=''
ENV VITE_API_PROD_URL=''
ENV VITE_PRODUCTION=${1}

RUN npm run build

# Stage 2
FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/server/ ./

EXPOSE 5000

CMD ["npm", "start"]