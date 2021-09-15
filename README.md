# Movie API microservices

## How to run locally
Just make sure that you have `docker` and `docker-compose` installed on your machine and `Make` commands works for you

You would also need to request for your own api key in http://www.omdbapi.com/
then replace in `Makefile` with your own values
```
OMD_API_KEY=xxx OMD_API_I=xxx
``` 
Then in root location type
```
make run
```
## To stop application
```
make stop
```
## Postman collection
Now you can import postman collection and authorize yourself with mock creds via POST auth endpoint. You can find mock creds in auth microservice `README` file
Once authorized token is saved to variables so no need to copy that each time.

## How to run tests
That is easy one 
```
make test
```
## How to develop
Go ahead to ./movies location and type. But remember... you would need also up and running mongodb so run it docker or on your machine. Then pass in Makefile proper variables to authentivate your mongodb
```
make run
```
