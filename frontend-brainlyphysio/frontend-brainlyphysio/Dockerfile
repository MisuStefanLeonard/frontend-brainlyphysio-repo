# Build Stage 1
ARG NODE_VERSION=23.7
FROM node:${NODE_VERSION}-slim AS build
WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN corepack enable

# Copy package.json and your lockfile, here we add pnpm-lock.yaml for illustration
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm i --prod

# Copy the entire project
COPY . ./

# Build the project
RUN pnpm run build

# Build Stage 2

FROM node:${NODE_VERSION}-slim
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./

# Change the port and host
ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000

CMD ["node", "/app/server/index.mjs"]
