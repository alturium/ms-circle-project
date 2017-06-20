ms-geometry-service
===========================================

The ms-geometry-service will calculate the area of a circle.

Currently, the service is running on heroku at https://fathomless-everglades-97176.herokuapp.com/.

If run locally, then it will use port 3100.

## Installation

After performing a git clone of the top-level 'ms-circle-project' :

>cd ms-geometry-service

>mvn compile

>mvn package

>java -jar target\demo-0.0.1-SNAPSHOT.jar

## Test

Using curl:

curl -X POST -H "Content-Type: application/json" localhost:3100/calculate -d "{ \"input\" : \"1\" }"

## History

The following OSS project was used as a basis for creating this service:

[Learn how to validate a restful web request with spring](http://www.leveluplunch.com/java/tutorials/017-validate-spring-rest-webservice-request/)
