# Use an official Node runtime as a parent image
FROM node:18

# copy codebase to docker codebase
ADD ./ /usr/app

# Set the working directory in the container
WORKDIR /usr/app

# Install dependencies
RUN npm install

# Expose the port for the backend
EXPOSE 8080:8080

# Define the command to run your application
CMD ["node", "index.js"]
