install:
	echo [install] services
	cd movies && npm i
	cd ..
	cd auth && npm i
	cd ..
lint:
	echo [lint] services
	cd movies && npm run lint
test:
	echo [lint] services
	cd movies && npm run test
	cd ..
run:
	echo [run all locally]
	OMD_API_KEY=xxx OMD_API_I=xxx JWT_SECRET=secret docker-compose up -d --remove-orphans
stop:
	echo [stop all]
	docker-compose down
