# Use an official Node.js runtime as a base image
FROM node:20.16.0-alpine3.19

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Define the entrypoint to allow Kubernetes CronJob to specify the script
ENTRYPOINT ["node"]