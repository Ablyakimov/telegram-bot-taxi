build:
	docker build -t tgbottaxi .
run:
	docker run -d -p 5001:5001 --name tgbot tgbottaxi