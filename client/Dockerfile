# Use the official Node.js image as the base image
FROM node:lts-alpine as builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the working directory
COPY . .

# Build the application (assuming your package.json has a "build" script)
RUN npm run build

# Use the official Nginx image as the base image for the production image
FROM nginx:alpine

# Copy the build output from the builder stage to the nginx web root
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# The CMD instruction specifies the command to run when the container starts
CMD ["nginx", "-g", "daemon off;"]