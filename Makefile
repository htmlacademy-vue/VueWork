# Makefile for local development

rebuild_backend:
	docker-compose down -v
	docker-compose run backend npm run rebuild

start_project:
	docker-compose down -v
	docker-compose up

run_server:
	docker-compose down -v
	docker-compose up backend

run_tests:
	cd src/frontend; echo "...Starting frontend tests" && \
	npm run test:unit
