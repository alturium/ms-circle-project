curl -X POST -H "Content-Type: application/json" localhost:3100/calculate -d "{ \"input\" : \"1\" }"

curl -X POST -H "Content-Type: application/json" localhost:3100/calculate -d "{ \"input\" : \"123\" }"

curl -X POST -H "Content-Type: application/json" localhost:3100/calculate -d "{ \"input\" : \"\" }"

curl -X POST -H "Content-Type: application/json" localhost:3100/calculate -d "{ \"input\" : \"aa\" }"
pause