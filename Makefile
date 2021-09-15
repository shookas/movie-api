install:
	echo [install] services
	cd movies-api && npm i
	cd auth && npm i
lint:
	echo [lint] services
	cd movies-api && npm run lint
test:
	echo [lint] services
	cd movies-api && npm run test
run:
	echo [run all locally]
	OMD_API_KEY=xxx OMD_API_I=xxx JWT_SECRET=secret docker-compose up -d --remove-orphans
stop:
	echo [stop all]
	docker-compose down
