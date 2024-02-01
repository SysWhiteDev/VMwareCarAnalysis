# Use an official Node runtime as a parent image
FROM node:18

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# copy codebase to docker codebase
ADD ./ /usr/app

# Set the working directory in the container
WORKDIR /usr/app

# Install dependencies
RUN npm install

# Expose the port for the ml backend
EXPOSE 8081:8081

# Define the command to run your application
CMD ["node", "index.ts"]
