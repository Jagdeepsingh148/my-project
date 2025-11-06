#!/bin/bash
redis-cli FLUSHALL
mongo featurestore --eval "db.events.drop(); db.feature_history.drop();"
echo "Redis and Mongo cleared."
#!/bin/bash
echo "Flushing Redis and dropping Mongo collections..."
redis-cli FLUSHALL
mongo featurestore --eval "db.events.drop(); db.feature_history.drop(); db.feature_definitions.drop();"
echo "Clean up complete."
