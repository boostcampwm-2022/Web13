#!/bin/bash

echo $2 | docker login -u $1 $3 --password-stdin

echo "docker logined"

cd backend || exit 1

touch .env

echo -e $4 > .env

echo "create .env"

EXIST_BLUE=$(docker-compose -p moyeo-server-blue -f docker-compose.dev.blue.yml pa grep Up)

if [ -z "$EXIST_BLUE" ]; then
    echo "blue up"
    docker-compose -p moyeo-server-blue -f docker-compose.dev.blue.yaml up -d
    BEFORE_COMPOSE="blue"
    AFTER_COMPOSE="green"
else
    echo "green up"
    docker-compose -p moyeo-server-green -f docker-compose.green.yml up -d
    BEFORE_COMPOSE="blue"
    AFTER_COMPOSE="green"
fi

sleep 10
 
EXIST_AFTER=$(docker-compose -p moyeo-server-${AFTER_COMPOSE} -f docker-compose.dev.${AFTER_COMPOSE}.yaml ps | grep Up)

if [ -n "$EXIST_AFTER" ]; then
  docker exec -it moyeo-nginx cp /etc/nginx/conf.d/nginx.${AFTER_COMPOSE}.conf /etc/nginx/conf.d/nginx.conf
  docker exec -it moyeo-nginx nginx -s reload
 
  docker-compose -p moyeo-server-${BEFORE_COMPOSE} -f docker-compose.dev.${BEFORE_COMPOSE}.yml down
  echo "$BEFORE_COMPOSE down"
fi