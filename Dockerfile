FROM node:8
MAINTAINER Luciana G Bruscino <luciana.bruscino@gmail.com>

# create directory to hold the application code inside the image
RUN mkdir -p /usr/src/alop-adapter-app

#set the currently active directory
WORKDIR /usr/src/alop-adapter-app

#bundle app's source code inside the Docker image
#COPY . /usr/src/alop-adapter-app
COPY package*.json ./

ADD . /usr/src/alop-adapter-app

# server.js file binds to port 8081, set EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 8080

# Install app dependencies
RUN npm install
# If building code for production
# RUN npm install --only=production

# Show current folder structure in logs
RUN ls -al -R

ENV NODE_ENV="production"
# start the app
CMD ["npm", "start"]