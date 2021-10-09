#!/usr/bin/env bash

source dev-env.sh

docker-compose -f docker-compose-dev.yml -f docker-compose-dev.yml down

#Run stack in detached mode
docker-compose -f docker-compose-dev.yml -f docker-compose-dev.yml up --build --remove-orphans
