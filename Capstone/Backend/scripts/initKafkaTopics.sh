#!/bin/bash
BROKER=${1:-localhost:9092}
TOPIC=${2:-events}
docker exec -it kafka kafka-topics --bootstrap-server $BROKER --create --topic $TOPIC --partitions 3 --replication-factor 1 || echo "Topic may already exist"
