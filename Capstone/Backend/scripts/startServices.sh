#!/bin/bash
echo "Starting Redis..."
redis-server --daemonize yes
echo "Starting MongoDB..."
mongod --dbpath ./data/mongo --logpath ./data/mongo.log --fork
echo "Ensure Kafka/Zookeeper are running manually or via Confluent Platform."
