# DigitalOcean App Platform / container deploy for the Pammi marketing site
FROM node:20-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Bake public Vite config at build time (must match DO App Platform env / build-args)
ARG VITE_TRY_NOW_URL=
ARG VITE_STAFF_APP_URL=
ARG VITE_GA_MEASUREMENT_ID=
ARG VITE_GA_PROPERTY_ID=
ENV VITE_TRY_NOW_URL=$VITE_TRY_NOW_URL
ENV VITE_STAFF_APP_URL=$VITE_STAFF_APP_URL
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID
ENV VITE_GA_PROPERTY_ID=$VITE_GA_PROPERTY_ID

RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js
COPY --from=build /app/package.json ./package.json

EXPOSE 8080
CMD ["node", "server.js"]
