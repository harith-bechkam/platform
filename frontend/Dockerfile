# Use Node.js version 20 as the base image in top of docker
FROM node:20.16.0-alpine3.19 AS builder

# Declaring env
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install --quiet

# Copy the rest of the application files into docker image
COPY . .

#src file - env.prod
#dest file - .env
#copy all contents from env.prod -> .env
RUN ls -la && mv env.prod .env

# Building our application
RUN npm run build

# Fetching the latest nginx image
FROM nginx:stable

# Copying built assets from builder
COPY --from=builder /app/build /usr/share/nginx/html