This is a NodeJS/ExpressJS Adapter REST API. It orchestrates multiple calls to backend business APIs and returns a single contract to a client. The application uses ReactiveX pattern with rx.js

It runs on containers in OpenShift.

---------------

# Run it locally
$ npm start

# Test the API locally
$ curl -v -X GET "http://localhost:8080/api/v1/home" -H "Authorization: Bearer xxx" -H "Accept: application/json" -H "Content-type: application/json" 

-------------------------
# Run it locally on docker container ( assumes docker is installed)
docker build command builds an image from a Dockerfile and a context. 

$ docker build -t alop/alop-adapter-api .
	# -t flag tags the image so it's easier to find later using the docker images command:

$ docker images

$ docker run -p 3000:8080 -d alop/alop-adapter-api
	# -d runs the container in detached mode, leaving the container running in the background.
	# -p flag redirects a public port to a private port inside the container.
	# 3000->8080 Docker maps the 8080 port inside of the container to the port 3000 on localhost.
	# 8080 matches what it was EXPOSE in the dockerfile and app.js

# Get container ID
$ docker ps -a

# Print app output
$ docker logs <container id>


# Able to modify files directly on the container locally. 
docker run -it alop/alop-adapter-api
docker ps
docker exec -it <4 digits of container id> /bin/bash

#look up mounted volumes


# Test the API on local Docker container
$ curl -v -X GET "http://localhost:3000/api/v1/home" -H "Authorization: Bearer xxx" -H "Accept: application/json" -H "Content-type: application/json" 

