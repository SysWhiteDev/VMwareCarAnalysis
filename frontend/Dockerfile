# Use an official Node runtime as a parent image
FROM node:18

# copy codebase to docker codebase
ADD ./ /usr/app


# Set the working directory in the container
WORKDIR /usr/app

# Install dependencies
RUN npm install

# Build the Nuxt.js application
RUN npm run build

# Expose the port that Nuxt.js will run on (default is 3000)
EXPOSE 3000:3000

# Define the command to run your application
CMD ["node", ".output/server/index.mjs"]
