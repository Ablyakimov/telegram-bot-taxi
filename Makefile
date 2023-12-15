build:
	docker build -t tgbottaxi .
run:
	docker run -d --name tgbottaxi --rm tgbottaxi